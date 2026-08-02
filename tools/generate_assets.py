#!/usr/bin/env python3
# ==========================================================
# Y-CARD — generate_assets.py
# يأخذ أي صورة شخصية (أي أبعاد)، يكتشف الوجه تلقائيًا، ويقصّها
# بشكل مربّع متمركز على الوجه بإطار احترافي (وليس منتصف الصورة
# الهندسي)، ثم يولّد منها profile.jpg وfavicon.png بالحجمين
# المناسبين ومضغوطة للأداء.
#
# طريقة الاستخدام:
#   python3 tools/generate_assets.py /path/to/original_photo.jpg
#
# يتطلب: pip install opencv-python-headless pillow --break-system-packages
# ==========================================================
import os
import sys

import cv2
from PIL import Image


def detect_face_box(image_path):
    img = cv2.imread(image_path)
    if img is None:
        sys.exit(f"خطأ: تعذّرت قراءة الصورة {image_path}")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)  # يساعد الكاشف مع الصور الداكنة/الاستوديو

    cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    face_cascade = cv2.CascadeClassifier(cascade_path)
    faces = face_cascade.detectMultiScale(
        gray, scaleFactor=1.05, minNeighbors=4, minSize=(80, 80)
    )

    if len(faces) == 0:
        return None

    # إن وُجد أكثر من وجه، نأخذ الأكبر (الأقرب للكاميرا عادةً)
    faces = sorted(faces, key=lambda f: f[2] * f[3], reverse=True)
    return faces[0]  # (x, y, w, h)


def crop_centered_on_face(image_path, output_path, size=640):
    img = Image.open(image_path)
    face_box = detect_face_box(image_path)

    if face_box is None:
        print("⚠️  لم يُكتشف وجه — سيُستخدم القصّ المركزي الافتراضي بدلاً منه.")
        side = min(img.width, img.height)
        x0 = (img.width - side) // 2
        y0 = (img.height - side) // 2
        crop_size = side
    else:
        fx, fy, fw, fh = face_box
        face_cx = fx + fw / 2
        face_cy = fy + fh / 2

        crop_size = min(img.width, img.height)
        x0 = int(round(face_cx - crop_size / 2))
        x0 = max(0, min(x0, img.width - crop_size))

        # مركز الوجه عند 45% من ارتفاع القصّ (هامش أعلى للشعر، مساحة
        # أسفل للرقبة/الكتفين — إطار احترافي معتاد لصور البروفايل)
        y0 = int(round(face_cy - crop_size * 0.45))
        y0 = max(0, min(y0, img.height - crop_size))

    box = (x0, y0, x0 + crop_size, y0 + crop_size)
    cropped = img.crop(box).resize((size, size), Image.LANCZOS)
    cropped.convert("RGB").save(output_path, "JPEG", quality=85, optimize=True)
    return cropped


def main():
    if len(sys.argv) < 2:
        sys.exit("طريقة الاستخدام: python3 tools/generate_assets.py /path/to/photo.jpg")

    source_path = sys.argv[1]
    if not os.path.exists(source_path):
        sys.exit(f"خطأ: لم أجد الملف {source_path}")

    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    profile_out = os.path.join(project_root, "images", "profile.jpg")
    favicon_out = os.path.join(project_root, "images", "favicon.png")

    os.makedirs(os.path.dirname(profile_out), exist_ok=True)

    cropped = crop_centered_on_face(source_path, profile_out, size=640)
    print(f"✅ تم إنشاء {profile_out} ({round(os.path.getsize(profile_out)/1024, 1)} KB)")

    favicon = cropped.resize((180, 180), Image.LANCZOS)
    favicon.save(favicon_out, "PNG", optimize=True)
    print(f"✅ تم إنشاء {favicon_out} ({round(os.path.getsize(favicon_out)/1024, 1)} KB)")


if __name__ == "__main__":
    main()
