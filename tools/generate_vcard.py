#!/usr/bin/env python3
# ==========================================================
# Y-CARD — generate_vcard.py
# يقرأ config.js (نفس ملف إعدادات الموقع) + images/profile.jpg
# ويولّد vcard/contact.vcf متوافقًا مع RFC 2426 (CRLF + Line
# Folding) وقابلًا للقراءة على iOS وAndroid، بصورة مضمّنة.
#
# طريقة الاستخدام (من داخل مجلد المشروع):
#   python3 tools/generate_vcard.py
# ==========================================================
import base64
import json
import os
import re
import sys
from datetime import datetime, timezone


def load_config(config_path):
    content = open(config_path, encoding="utf-8").read()
    start = content.index("{")
    end = content.rindex("}")
    return json.loads(content[start:end + 1])


def fold(line, limit=75):
    """RFC 2426 line folding: أول سطر <=75 محرفًا، الأسطر التالية
    تبدأ بمسافة واحدة و<=74 محرفًا من المحتوى لكل سطر."""
    if len(line) <= limit:
        return line
    parts = [line[:limit]]
    rest = line[limit:]
    while rest:
        parts.append(" " + rest[:limit - 1])
        rest = rest[limit - 1:]
    return "\r\n".join(parts)


def main():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    config_path = os.path.join(project_root, "config.js")
    photo_path = os.path.join(project_root, "images", "profile.jpg")
    output_path = os.path.join(project_root, "vcard", "contact.vcf")

    if not os.path.exists(config_path):
        sys.exit(f"خطأ: لم أجد {config_path}")
    if not os.path.exists(photo_path):
        sys.exit(f"خطأ: لم أجد {photo_path} — ضع الصورة الشخصية هناك أولاً")

    config = load_config(config_path)
    vcard_data = config.get("vcard", {})
    family_name = vcard_data.get("familyName", "")
    given_name = vcard_data.get("givenName", "")
    formatted_name = vcard_data.get("formattedName", "")
    job_title = config.get("en", {}).get("jobTitle", "")
    email = config.get("email", "")
    phone = config.get("phone", "")
    linkedin = config.get("socials", {}).get("linkedin", "")

    with open(photo_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")

    now = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")

    lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        f"N:{family_name};{given_name};;;",
        f"FN:{formatted_name}",
        f"TITLE:{job_title}",
        f"EMAIL;TYPE=INTERNET:{email}",
        f"TEL;TYPE=CELL,VOICE:{phone}",
    ]
    if linkedin:
        lines.append(f"URL:{linkedin}")
    lines.append(fold("PHOTO;ENCODING=b;TYPE=JPEG:" + b64))
    lines.append(f"REV:{now}")
    lines.append("END:VCARD")

    content = "\r\n".join(lines) + "\r\n"

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        f.write(content)

    size_kb = round(os.path.getsize(output_path) / 1024, 1)
    print(f"✅ تم توليد {output_path} بنجاح ({size_kb} KB)")


if __name__ == "__main__":
    main()
