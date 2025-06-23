# Trang Bảo Trì 3D - ALI STUDIO

Trang bảo trì tương tác với hiệu ứng 3D đẹp mắt được xây dựng bằng HTML, CSS và Three.js.

## Tính năng

- Thiết kế responsive hoạt động trên mọi thiết bị
- Nền 3D tương tác với các hình cầu và ngôi sao
- Đồng hồ đếm ngược hiển thị thời gian hệ thống sẽ hoạt động trở lại
- Giao diện hiện đại với hiệu ứng glass-morphism
- Hiệu ứng chuyển động mượt mà

## Cài đặt

1. Tải xuống hoặc clone repository này
2. Mở file `index.html` trong trình duyệt web

Không cần quy trình build. Đây là một trang web tĩnh đơn giản chạy trực tiếp trên trình duyệt.

## Tùy chỉnh

### Thay đổi thời gian đếm ngược

Mở file `js/main.js` và chỉnh sửa thời gian đếm ngược ở đầu file:

```javascript
// Thay đổi số ngày bảo trì
const countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 3); // Thay đổi số 3 thành số ngày mong muốn
```

### Thay đổi màu sắc

Các màu chính có thể được sửa đổi trong file `css/styles.css`. Tìm các mã màu như `#ff6b6b` và `#ff9e80`.

### Thay đổi nội dung văn bản

Chỉnh sửa văn bản trong file `index.html` để tùy chỉnh thông báo bảo trì.

## Thư viện sử dụng

- [Three.js](https://threejs.org/) - Thư viện JavaScript 3D

## Tương thích trình duyệt

Trang bảo trì này hoạt động trên tất cả các trình duyệt hiện đại hỗ trợ WebGL:
- Chrome
- Firefox
- Safari
- Edge

## Giấy phép

Bạn có thể tự do sử dụng template này cho trang bảo trì website của mình. 