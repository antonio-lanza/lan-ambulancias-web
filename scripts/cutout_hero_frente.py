"""Reconstrói o PNG transparente do remove.bg (achatamento em JPEG preto)."""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

src = Path(
    r"C:\Users\saicon_r2\.cursor\projects\c-Users-saicon-r2-lan-ambulancias-web"
    r"\assets\c__Users_saicon_r2_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"d7e9ba465d9fddaca37194f6fdd26161_images_58839__1_-removebg-7d5cef65-9909-4177-8903-327ddf4206ed.png"
)
out = Path(r"C:\Users\saicon_r2\lan-ambulancias-web\public\media\photos\lan_hero_frente.png")
preview = Path(r"C:\Users\saicon_r2\lan-ambulancias-web\public\media\photos\_hero_preview.png")

im = Image.open(src).convert("RGBA")
w, h = im.size
hi = im.resize((w * 2, h * 2), Image.Resampling.LANCZOS)
arr = np.array(hi)
hh, ww = arr.shape[:2]
rgb = arr[:, :, :3].astype(np.int16)
mx = rgb.max(axis=2)

# Fundo = quase-preto ligado às bordas (o que o JPEG pintou no lugar do alpha)
is_dark = mx <= 16
visited = np.zeros((hh, ww), dtype=bool)
q = deque()


def push(y: int, x: int) -> None:
    if 0 <= y < hh and 0 <= x < ww and not visited[y, x] and is_dark[y, x]:
        visited[y, x] = True
        q.append((y, x))


for x in range(ww):
    push(0, x)
    push(hh - 1, x)
for y in range(hh):
    push(y, 0)
    push(y, ww - 1)
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        push(y + dy, x + dx)

# Recupera só pneu/para-choque (faixa de baixo). Dilatar o carro inteiro
# cria um anel preto em volta — era isso que estava horrível.
ys_v, _ = np.where(mx > 28)
y_cut = int(ys_v.max() - 0.22 * (ys_v.max() - ys_v.min()))
lower = np.zeros((hh, ww), dtype=bool)
lower[y_cut:, :] = True
veh_low = Image.fromarray(((mx > 28).astype(np.uint8) * 255), mode="L")
veh_low = np.asarray(veh_low.filter(ImageFilter.MaxFilter(13))) > 0
reclaim = visited & veh_low & lower
bg = visited & ~reclaim

hard = np.where(bg, 0, 255).astype(np.uint8)
mask = Image.fromarray(hard, mode="L")
# Encolhe 1–2px para cortar o anel JPEG preto da borda
mask = mask.filter(ImageFilter.MinFilter(5))
mask = mask.filter(ImageFilter.MaxFilter(3))
mask = mask.filter(ImageFilter.MinFilter(3))
alpha = mask.filter(ImageFilter.GaussianBlur(radius=1.1))
alpha_arr = np.clip(np.asarray(alpha, dtype=np.float32), 0, 255)

rgb_f = arr[:, :, :3].astype(np.float32)
opaque = alpha_arr > 240
edge = (alpha_arr > 8) & (alpha_arr < 240)
lum = rgb_f.mean(axis=2)

# Mata halo preto (pixel escuro na borda)
black_halo = edge & (lum < 80)
alpha_arr[black_halo] *= np.clip(lum[black_halo] / 80.0, 0, 1) ** 1.8

wt = opaque.astype(np.float32)


def blur_ch(ch: np.ndarray, radius: float) -> np.ndarray:
    img = Image.fromarray(np.clip(ch, 0, 255).astype(np.uint8), mode="L")
    return np.asarray(img.filter(ImageFilter.GaussianBlur(radius=radius)), dtype=np.float32)


sum_r = blur_ch(rgb_f[:, :, 0] * wt, 2.8)
sum_g = blur_ch(rgb_f[:, :, 1] * wt, 2.8)
sum_b = blur_ch(rgb_f[:, :, 2] * wt, 2.8)
sum_w = blur_ch(wt * 255.0, 2.8) / 255.0 + 1e-5
neigh = np.stack([sum_r / sum_w, sum_g / sum_w, sum_b / sum_w], axis=-1)

rgb_out = rgb_f.copy()
rgb_out[edge] = rgb_out[edge] * 0.12 + neigh[edge] * 0.88
rgb_out[black_halo] = neigh[black_halo]
rgb_out[alpha_arr < 8] = 0

out_hi = np.dstack(
    [np.clip(rgb_out, 0, 255).astype(np.uint8), np.clip(alpha_arr, 0, 255).astype(np.uint8)]
)
full = Image.fromarray(out_hi, mode="RGBA").resize((w, h), Image.Resampling.LANCZOS)
a = np.array(full)
ys, xs = np.where(a[:, :, 3] > 10)
pad = 8
y0, y1 = max(0, int(ys.min()) - pad), min(h, int(ys.max()) + pad + 1)
x0, x1 = max(0, int(xs.min()) - pad), min(w, int(xs.max()) + pad + 1)
final = Image.fromarray(a[y0:y1, x0:x1], "RGBA")
final.save(out, "PNG", optimize=True)

navy = Image.new("RGBA", final.size, (11, 42, 92, 255))
Image.alpha_composite(navy, final).convert("RGB").save(preview, quality=92)
print("saved", out, final.size, "transparent%", round(float((np.array(final)[:, :, 3] == 0).mean()), 3))
