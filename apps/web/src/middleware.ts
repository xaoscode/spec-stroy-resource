import NextAuth from "next-auth";
import { authConfig } from "./app/auth.config";

// export function middleware(request: NextRequest) {
// 	// const hostname = request.headers.get("host"); // Получаем текущий домен

// 	// if (hostname && hostname.startsWith("local")) {
// 	//   // Если запрос идет с поддомена admin, направляем в админку
// 	//   if (!request.nextUrl.pathname.startsWith("/admin")) {
// 	//     const url = request.nextUrl.clone();
// 	//     url.pathname = `/admin${request.nextUrl.pathname}`;
// 	//     return NextResponse.rewrite(url);
// 	//   }
// 	// } else {
// 	//   // Если основной домен, оставляем как есть
// 	//   if (request.nextUrl.pathname.startsWith("/admin")) {
// 	//     const url = request.nextUrl.clone();
// 	//     url.pathname = "/";
// 	//     return NextResponse.rewrite(url);
// 	//   }
// 	// }

// 	return NextResponse.next();
// }
export default NextAuth(authConfig).auth;

export const config = {
	matcher: ["/admin/:path*"],
};
