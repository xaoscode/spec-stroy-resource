import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host"); // Получаем текущий домен

  // if (hostname && hostname.startsWith("local")) {
  //   // Если запрос идет с поддомена admin, направляем в админку
  //   if (!request.nextUrl.pathname.startsWith("/admin")) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = `/admin${request.nextUrl.pathname}`;
  //     return NextResponse.rewrite(url);
  //   }
  // } else {
  //   // Если основной домен, оставляем как есть
  //   if (request.nextUrl.pathname.startsWith("/admin")) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/";
  //     return NextResponse.rewrite(url);
  //   }
  // }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
