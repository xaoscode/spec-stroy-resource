import { getFilteredProjects } from "@/app/(site)/api/Projects";
import { NextRequest, NextResponse } from "next/server";

type ApiResponse = {
	data?: unknown;
	error?: string;
};

export async function GET(request: NextRequest) {
	console.log("hand");
	const { searchParams } = new URL(request.url);
	const param = searchParams.get("current");
	let result: ApiResponse;
	console.log(param);
	try {
		const data = await getFilteredProjects(1, 5, param || undefined);
		result = { data };
	} catch (error) {
		result = { error: "Failed to fetch data" };
	}

	const response = NextResponse.json(result);
	// response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

	return response;
}
