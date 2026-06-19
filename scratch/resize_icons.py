import os
from PIL import Image

src_path = r"C:\Users\jeeva\.gemini\antigravity-ide\brain\573c4008-64dc-4c18-8fc4-45af0dec4f9d\brand_logo_icon_1781882266712.png"
public_dir = r"c:\jess\public"
app_dir = r"c:\jess\src\app"

# Ensure output folders exist
os.makedirs(public_dir, exist_ok=True)
os.makedirs(app_dir, exist_ok=True)

# Load the source image
img = Image.open(src_path).convert("RGBA")

# Standard icon dimensions
sizes = {
    "icon-16.png": (16, 16),
    "icon-32.png": (32, 32),
    "icon-192.png": (192, 192),
    "icon-512.png": (512, 512),
    "apple-touch-icon.png": (180, 180),
}

# Resize and save standard PWA/Apple icons
for name, size in sizes.items():
    out_path = os.path.join(public_dir, name)
    resized_img = img.resize(size, Image.Resampling.LANCZOS)
    resized_img.save(out_path, "PNG")
    print(f"Saved: {out_path} ({size[0]}x{size[1]})")

# Create a multi-resolution favicon.ico inside app/ folder
favicon_sizes = [(16, 16), (32, 32), (48, 48)]
favicon_img = img.resize((48, 48), Image.Resampling.LANCZOS)
favicon_out = os.path.join(app_dir, "favicon.ico")

# Save as ICO with multiple sizes embedded
favicon_img.save(
    favicon_out,
    format="ICO",
    sizes=favicon_sizes,
)
print(f"Saved multi-resolution favicon: {favicon_out}")
