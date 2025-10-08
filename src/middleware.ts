import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware chạy cho mỗi request
export function middleware(request: NextRequest) {
  // Lấy accessToken từ cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // Lấy path hiện tại của user
  const { pathname } = request.nextUrl;

  // Các trang public không cần đăng nhập
  const publicPaths = ['/account/login']; // có thể thêm /forgot-password nếu có

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // ✅ Nếu chưa đăng nhập và không phải trang public → redirect về /login
  if (!accessToken && !isPublicPath) {
    const loginUrl = new URL('/account/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Nếu đã login mà vẫn cố vào /login → redirect sang /main/tasks
  if (accessToken && isPublicPath) {
    return NextResponse.redirect(new URL('/main/tasks', request.url));
  }

  // ✅ Cho phép tiếp tục truy cập bình thường
  return NextResponse.next();
}

// Cấu hình matcher → áp dụng cho mọi route trừ static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};