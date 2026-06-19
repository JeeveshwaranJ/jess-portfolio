import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    # 1. Base Image setup (1200x630, purple background)
    width, height = 1200, 630
    purple_color = (124, 92, 255) # #7C5CFF
    black_color = (18, 18, 18)     # #121212
    yellow_color = (253, 224, 71)  # #FDE047
    cream_color = (245, 241, 232)  # #F5F1E8
    orange_color = (255, 87, 34)   # #FF5722

    base = Image.new("RGBA", (width, height), purple_color)
    draw = ImageDraw.Draw(base)

    # 2. Draw dot-grid pattern
    dot_color = (18, 18, 18, 20) # 10% opacity black
    dot_image = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    dot_draw = ImageDraw.Draw(dot_image)
    for x in range(20, width, 24):
        for y in range(20, height, 24):
            dot_draw.ellipse([x - 2, y - 2, x + 2, y + 2], fill=dot_color)
    base = Image.alpha_composite(base, dot_image)
    draw = ImageDraw.Draw(base)

    # 3. Load Fonts
    # Try using Windows standard fonts
    font_dir = r"C:\Windows\Fonts"
    impact_path = os.path.join(font_dir, "impact.ttf")
    arialbd_path = os.path.join(font_dir, "arialbd.ttf")
    arial_path = os.path.join(font_dir, "arial.ttf")

    # Fallbacks
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()
    font_body = ImageFont.load_default()
    font_badge = ImageFont.load_default()

    try:
        if os.path.exists(impact_path):
            font_title = ImageFont.truetype(impact_path, 80)
            font_badge_title = ImageFont.truetype(impact_path, 36)
            font_badge_header = ImageFont.truetype(impact_path, 20)
        else:
            font_title = ImageFont.load_default()
            font_badge_title = ImageFont.load_default()
            font_badge_header = ImageFont.load_default()

        if os.path.exists(arialbd_path):
            font_subtitle = ImageFont.truetype(arialbd_path, 42)
            font_subtext = ImageFont.truetype(arialbd_path, 28)
            font_badge_dept = ImageFont.truetype(arialbd_path, 16)
        else:
            font_subtitle = ImageFont.load_default()
            font_subtext = ImageFont.load_default()
            font_badge_dept = ImageFont.load_default()
    except Exception as e:
        print(f"Error loading fonts, falling back: {e}")

    # 4. Draw Typography on Left Side
    # Title shadow & text
    # "JESS.DEV"
    draw.text((70, 70), "JESS.DEV", font=font_title, fill=black_color)
    draw.text((66, 66), "JESS.DEV", font=font_title, fill=yellow_color)

    # "I Build Digital Businesses"
    draw.text((70, 180), "I BUILD DIGITAL\nBUSINESSES.", font=font_subtitle, fill=black_color)
    # Highlight badge background for "Websites • SaaS • AI Tools"
    subtext_str = " WEBSITES  •  SAAS  •  AI TOOLS "
    
    # Simple badge drawing
    draw.rectangle([70, 310, 520, 365], fill=black_color)
    draw.rectangle([66, 306, 516, 361], fill=cream_color, outline=black_color, width=3)
    draw.text((80, 318), subtext_str, font=font_subtext, fill=black_color)

    # Add a cool brutalist call-out sticker
    draw.rectangle([70, 480, 270, 530], fill=black_color)
    draw.rectangle([66, 476, 266, 526], fill=orange_color, outline=black_color, width=3)
    draw.text((82, 488), "AVAILABLE FOR WORK", font=font_badge_dept, fill=cream_color)

    # 5. Build the "Builder Pass" Badge Card
    badge_w, badge_h = 320, 440
    badge = Image.new("RGBA", (badge_w, badge_h), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)

    # Card background (cream) and border (black)
    b_draw.rectangle([0, 0, badge_w - 4, badge_h - 4], fill=cream_color, outline=black_color, width=4)
    # Top slot hole
    b_draw.rounded_rectangle([badge_w // 2 - 25, 12, badge_w // 2 + 25, 22], radius=5, fill=black_color)

    # Header bar
    b_draw.rectangle([15, 35, badge_w - 19, 70], fill=black_color)
    b_draw.text((badge_w // 2, 42), "BUILDER PASS", font=font_badge_header, fill=yellow_color, anchor="mm")

    # Photo Frame (purple circle)
    frame_cx, frame_cy = badge_w // 2, 160
    frame_r = 65
    b_draw.ellipse([frame_cx - frame_r, frame_cy - frame_r, frame_cx + frame_r, frame_cy + frame_r], fill=purple_color, outline=black_color, width=4)

    # Load and insert avatar
    avatar_path = r"c:\jess\public\avatar.png"
    if os.path.exists(avatar_path):
        avatar = Image.open(avatar_path).convert("RGBA")
        # Resize avatar
        avatar_sz = 110
        avatar_resized = avatar.resize((avatar_sz, avatar_sz), Image.Resampling.LANCZOS)
        # Create a circular mask for the avatar
        mask = Image.new("L", (avatar_sz, avatar_sz), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse([0, 0, avatar_sz, avatar_sz], fill=255)
        # Paste avatar into badge
        badge.paste(avatar_resized, (frame_cx - avatar_sz // 2, frame_cy - avatar_sz // 2), mask=mask)

    # Identity Info on card
    b_draw.text((badge_w // 2, 260), "JESS.DEV", font=font_badge_title, fill=black_color, anchor="mm")
    b_draw.text((badge_w // 2, 305), "Dept: AI & SaaS Tools", font=font_badge_dept, fill=(18, 18, 18, 160), anchor="mm")

    # Barcode representation
    barcode_y = 350
    barcode_x_start = 40
    for i in range(24):
        bar_w = 4 if (i % 3 == 0 or i % 5 == 0) else 2
        bar_space = 3 if i % 2 == 0 else 5
        b_draw.rectangle([barcode_x_start, barcode_y, barcode_x_start + bar_w, barcode_y + 40], fill=black_color)
        barcode_x_start += bar_w + bar_space

    # 6. Rotate the badge and shadow
    rotation_angle = -5
    # Create shadow
    shadow = Image.new("RGBA", (badge_w, badge_h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rectangle([0, 0, badge_w - 4, badge_h - 4], fill=black_color)
    shadow_rot = shadow.rotate(rotation_angle, resample=Image.Resampling.BICUBIC, expand=True)

    badge_rot = badge.rotate(rotation_angle, resample=Image.Resampling.BICUBIC, expand=True)

    # Paste shadow then badge onto base image
    badge_x, badge_y = 750, 90
    shadow_offset = 12
    base.paste(shadow_rot, (badge_x + shadow_offset, badge_y + shadow_offset), mask=shadow_rot)
    base.paste(badge_rot, (badge_x, badge_y), mask=badge_rot)

    # 7. Draw final thick border around base image
    draw.rectangle([0, 0, width - 1, height - 1], outline=black_color, width=10)

    # Save to public directory
    output_path = r"c:\jess\public\og-image.png"
    base.convert("RGB").save(output_path, "PNG")
    print(f"Generated brutalist OG image at: {output_path} with size: {base.size}")

if __name__ == "__main__":
    generate_og_image()
