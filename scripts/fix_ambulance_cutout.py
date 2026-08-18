"""Refina contorno da ambulância: borda mais limpa, menos tremido e menos halo."""
from PIL import Image, ImageFilter
import numpy as np
from pathlib import Path

src = Path(r"C:\Users\saicon_r2\lan-ambulancias-web\public\media\photos\lan_defrente_semfundo.png")
backup = src.with_name("lan_defrente_semfundo_original.png")
if not backup.exists():
    backup.write_bytes(src.read_bytes())

im = Image.open(backup).convert("RGBA")
w, h = im.size
hi = im.resize((w * 2, h * 2), Image.Resampling.LANCZOS)
arr = np.asarray(hi, dtype=np.uint8)
rgb = arr[:, :, :3].astype(np.float32)
a = arr[:, :, 3].astype(np.float32)

hard = np.where(a > 40, 255, 0).astype(np.uint8)
mask = Image.fromarray(hard, mode="L")

mask = mask.filter(ImageFilter.MaxFilter(7))
mask = mask.filter(ImageFilter.MinFilter(7))
mask = mask.filter(ImageFilter.MaxFilter(5))
mask = mask.filter(ImageFilter.MinFilter(5))
mask = mask.filter(ImageFilter.MinFilter(3))
mask = mask.filter(ImageFilter.MaxFilter(3))

alpha = mask.filter(ImageFilter.GaussianBlur(radius=1.8))
alpha_arr = np.asarray(alpha, dtype=np.float32)
alpha_arr = np.nan_to_num(alpha_arr, nan=0.0)
alpha_arr = np.clip((alpha_arr - 18.0) * (255.0 / 237.0), 0, 255)
alpha_img = Image.fromarray(alpha_arr.astype(np.uint8), mode="L")
alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=0.85))
a_new = np.asarray(alpha_img, dtype=np.float32)

opaque = a_new > 235
edge = (a_new > 6) & (a_new < 235)

rgb_masked = rgb.copy()
rgb_masked[~opaque] = 0
wt = opaque.astype(np.float32)


def blur_ch(ch: np.ndarray, radius: float) -> np.ndarray:
    img = Image.fromarray(np.clip(ch, 0, 255).astype(np.uint8), mode="L")
    return np.asarray(img.filter(ImageFilter.GaussianBlur(radius=radius)), dtype=np.float32)


sum_r = blur_ch(rgb_masked[:, :, 0] * wt, 3.0)
sum_g = blur_ch(rgb_masked[:, :, 1] * wt, 3.0)
sum_b = blur_ch(rgb_masked[:, :, 2] * wt, 3.0)
sum_w = blur_ch(wt * 255.0, 3.0) / 255.0 + 1e-5
neigh = np.stack([sum_r / sum_w, sum_g / sum_w, sum_b / sum_w], axis=-1)

rgb_out = rgb.copy()
rgb_out[edge] = rgb_out[edge] * 0.3 + neigh[edge] * 0.7
lum = rgb.mean(axis=2)
fringe = edge & (lum > 155)
rgb_out[fringe] = neigh[fringe]
rgb_out[a_new < 6] = 0

out_hi = np.dstack(
    [
        np.clip(rgb_out, 0, 255).astype(np.uint8),
        np.clip(a_new, 0, 255).astype(np.uint8),
    ]
)
final = Image.fromarray(out_hi, mode="RGBA").resize((w, h), Image.Resampling.LANCZOS)
final.save(src, "PNG", optimize=True)
print("refined", src, final.size)
