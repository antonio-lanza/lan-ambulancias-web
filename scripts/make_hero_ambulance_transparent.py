"""Converte fundo preto (conectado às bordas) em alpha, preservando pretos da viatura."""
from PIL import Image
import numpy as np
from collections import deque
from pathlib import Path

src = Path(r"C:\Users\saicon_r2\lan-ambulancias-web\public\media\photos\lan_defrente_hero.png")
im = Image.open(src).convert("RGBA")
arr = np.array(im)
h, w = arr.shape[:2]
rgb = arr[:, :, :3].astype(np.int16)

# Quase-preto = candidato a fundo
is_dark = rgb.max(axis=2) <= 18

# Flood fill a partir das bordas: só remove preto ligado ao fundo
visited = np.zeros((h, w), dtype=bool)
q = deque()

def push(y, x):
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

# Suaviza a borda do fundo (1px dilatação leve)
bg = visited
bg_dilated = bg.copy()
bg_dilated[1:, :] |= bg[:-1, :]
bg_dilated[:-1, :] |= bg[1:, :]
bg_dilated[:, 1:] |= bg[:, :-1]
bg_dilated[:, :-1] |= bg[:, 1:]

alpha = np.where(bg_dilated, 0, 255).astype(np.uint8)

# Antialias simples na borda
edge = bg_dilated ^ bg
alpha[edge & ~bg] = 90

out = arr.copy()
out[:, :, 3] = alpha
out[bg_dilated, :3] = 0

Image.fromarray(out, "RGBA").save(src, "PNG", optimize=True)
print("saved", src, "transparent%", (alpha == 0).mean())
