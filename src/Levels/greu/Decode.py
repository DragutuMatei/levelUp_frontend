from PIL import Image
import numpy as np

Image.MAX_IMAGE_PIXELS = None

def bits_to_bytes(bits):
    return bytes(int(bits[i:i+8], 2) for i in range(0, len(bits), 8))

def decode_file_from_image(encoded_img_path, output_file_path, num_bytes):
    img = Image.open(encoded_img_path).convert('RGB')
    data = np.array(img).reshape(-1, 3)

    total_bits = num_bytes * 8
    bits = ''
    for i in range(total_bits):
        channel = i % 3
        pixel_idx = i // 3
        bits += str(data[pixel_idx][channel] & 1)

    with open(output_file_path, 'wb') as f:
        f.write(bits_to_bytes(bits))

decode_file_from_image("encoded.png", "extracted1.stl", num_bytes=123456)
from PIL import Image
import numpy as np

Image.MAX_IMAGE_PIXELS = None

def bits_to_bytes(bits):
    return bytes(int(bits[i:i+8], 2) for i in range(0, len(bits), 8))


def decode_step_from_image(encoded_img_path, output_step_path, num_bytes):
    try:
        img = Image.open(encoded_img_path).convert('RGB')
        print(f"Format imagine: {img.format}, Dimensiune: {img.size}")
        data = np.array(img, dtype=np.uint8).reshape(-1, 3)
        total_pixels = data.shape[0]
        print(f"Număr total pixeli: {total_pixels}")

        total_bits = num_bytes * 8
        if total_bits > total_pixels * 3:
            raise ValueError(f"Imaginea are doar {total_pixels * 3} biți disponibili, dar sunt necesari {total_bits} biți.")

        bits = ''
        for i in range(total_bits):
            channel = i % 3
            pixel_idx = i // 3
            bits += str(data[pixel_idx][channel] & 1)

        with open(output_step_path, 'wb') as f:
            f.write(bits_to_bytes(bits))
        print(f"Fișierul .step a fost salvat ca '{output_step_path}'")

    except FileNotFoundError:
        print(f"Eroare: Imaginea '{encoded_img_path}' nu a fost găsită.")
    except Exception as e:
        print(f"Eroare la decodare: {str(e)}")


decode_step_from_image("encoded.png", "decoded.step", 3069526)