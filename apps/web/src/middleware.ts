import NextAuth from "next-auth";
import { authConfig } from "./app/auth.config";
// import { NextRequest, NextResponse } from "next/server";

export const { auth: middleware } = NextAuth(authConfig);
// export default auth(async function middleware(request: NextRequest) {
// 	const hostname = request.headers.get("host"); // Получаем текущий домен
// 	console.log("host", request.nextUrl);

// 	if (hostname && hostname.startsWith("local")) {
// 		// Если запрос идет с поддомена admin, направляем в админку
// 		console.log("pathname", request.nextUrl.pathname);
// 		if (!request.nextUrl.pathname.startsWith("/admin")) {
// 			const url = request.nextUrl.clone();
// 			url.pathname = `/admin${request.nextUrl.pathname}`;
// 			return NextResponse.rewrite(url);
// 		}
// 	} else {
// 		// Если основной домен, оставляем как есть
// 		if (request.nextUrl.pathname.startsWith("/admin")) {
// 			const url = request.nextUrl.clone();
// 			url.pathname = "/";
// 			return NextResponse.rewrite(url);
// 		}
// 	}

// 	return NextResponse.next();
// });
export const config = {
	matcher: ["/:path*"],
};
// "/admin/:path*"
