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