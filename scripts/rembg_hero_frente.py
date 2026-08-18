"""Recorte de alta qualidade da ambulância (rembg) + limpeza de halo preto."""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

src = Path(
    r"C:\Users\saicon_r2\.cursor\projects\c-Users-saicon-r2-lan-ambulancias-web"
    r"\assets\c__Users_saicon_r2_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"d7e9ba465d9fddaca37194f6fdd26161_images_58839__1_-removebg-7d5cef65-9909-4177-8903-327ddf4206ed.png"
)
out = Path(r"C:\Users\saicon_r2\lan-ambulancias-web\public\media\photos\lan_hero_frente.png")

print("loading", src)
img = Image.open(src).convert("RGB")

print("running rembg isnet-general-use…")
session = new_session("isnet-general-use")
cut = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=12,
)

arr = np.array(cut)
h, w = arr.shape[:2]
rgb = arr[:, :, :3].astype(np.float32)
alpha = arr[:, :, 3].astype(np.float32)

# Preto ligado à borda e com pouca confiança do modelo = fundo, não pneu
mx = rgb.max(axis=2)
is_dark = mx <= 18
visited = np.zeros((h, w), dtype=bool)
q = deque()


def push(y: int, x: int) -> None:
    if 0 <= y < h and 0 <= x < w and not visited[y, x] and is_dark[y, x]:
        visited[y, x] = True
        q.append((y, x))


for x in range(w):
    push(0, x)
    push(h - 1, x)
for y in range(h):
    push(y, 0)
    push(y, w - 1)
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        push(y + dy, x + dx)

alpha[visited & (alpha < 200)] = 0

# Halo preto nas bordas: reduz alpha e puxa a cor do veículo
opaque = alpha > 235
edge = (alpha > 6) & (alpha < 235)
lum = rgb.mean(axis=2)
black_halo = edge & (lum < 55)
alpha[black_halo] *= np.clip(lum[black_halo] / 55.0, 0, 1) ** 1.4

wt = opaque.astype(np.float32)


def blur_ch(ch: np.ndarray, radius: float) -> np.ndarray:
    im = Image.fromarray(np.clip(ch, 0, 255).astype(np.uint8), mode="L")
    return np.asarray(im.filter(ImageFilter.GaussianBlur(radius=radius)), dtype=np.float32)


sum_r = blur_ch(rgb[:, :, 0] * wt, 2.4)
sum_g = blur_ch(rgb[:, :, 1] * wt, 2.4)
sum_b = blur_ch(rgb[:, :, 2] * wt, 2.4)
sum_w = blur_ch(wt * 255.0, 2.4) / 255.0 + 1e-5
neigh = np.stack([sum_r / sum_w, sum_g / sum_w, sum_b / sum_w], axis=-1)
rgb[edge] = rgb[edge] * 0.25 + neigh[edge] * 0.75
rgb[black_halo] = neigh[black_halo]
rgb[alpha < 8] = 0

alpha_img = Image.fromarray(np.clip(alpha, 0, 255).astype(np.uint8), mode="L")
alpha = np.asarray(alpha_img.filter(ImageFilter.GaussianBlur(radius=0.6)), dtype=np.float32)

out_arr = np.dstack(
    [np.clip(rgb, 0, 255).astype(np.uint8), np.clip(alpha, 0, 255).astype(np.uint8)]
)

ys, xs = np.where(out_arr[:, :, 3] > 8)
pad = 10
y0, y1 = max(0, int(ys.min()) - pad), min(h, int(ys.max()) + pad + 1)
x0, x1 = max(0, int(xs.min()) - pad), min(w, int(xs.max()) + pad + 1)
final = Image.fromarray(out_arr[y0:y1, x0:x1], "RGBA")
final.save(out, "PNG", optimize=True)
print("saved", out, final.size, "transparent%", round(float((np.array(final)[:, :, 3] == 0).mean()), 3))
