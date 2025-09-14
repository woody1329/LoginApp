from PIL import Image

ASCII_CHARS = "@%#*+=-:. "


def image_to_ascii(file):
    img = Image.open(file)
    img = img.convert("L")  # grayscale
    img = img.resize((100, 50))  # scale down
    pixels = img.getdata()
    ascii_str = "".join(
        [ASCII_CHARS[pixel * len(ASCII_CHARS) // 256] for pixel in pixels]
    )
    # add newlines
    lines = [ascii_str[i : i + 100] for i in range(0, len(ascii_str), 100)]
    return "\n".join(lines)
