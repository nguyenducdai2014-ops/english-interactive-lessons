# English Quest — trang bài học mẫu

Đây là trang HTML tĩnh mẫu dành cho bài học tiếng Anh tương tác của học sinh lớp 6.

## Xem trước tại máy

Trang không phụ thuộc vào font hoặc tài nguyên mạng bên ngoài, vì vậy sẽ không gặp lỗi truy cập `403` do CDN font. Chạy lệnh sau từ thư mục dự án:

```bash
python3 preview.py
```

Sau đó mở **http://127.0.0.1:4173** trong trình duyệt. Nhấn `Ctrl+C` trong terminal để dừng máy chủ xem trước.

Không cần cài đặt package hay build trước khi xem trang.

## Xem trực tiếp bằng GitHub Pages

Repository đã có workflow GitHub Actions để xuất bản `index.html`, `styles.css` và `script.js` lên GitHub Pages mỗi khi có thay đổi được đẩy lên nhánh `work`.

Sau khi đẩy repository lên GitHub, vào **Settings → Pages** và chọn **Source: GitHub Actions** (chỉ cần thực hiện một lần). Khi workflow **Deploy site to GitHub Pages** hoàn tất, mở đường dẫn hiển thị trong phần **Deployments** của repository hoặc trong log bước **Deploy to GitHub Pages**.

Địa chỉ thường có dạng:

```text
https://<ten-tai-khoan-github>.github.io/<ten-repository>/
```

Nếu repository dùng domain tùy chỉnh, GitHub sẽ hiển thị URL tương ứng trong trang Pages.
