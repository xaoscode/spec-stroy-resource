"use server";

import { API } from "@/app/api";
import { z } from "zod";

export async function NewMessageAction(
	prevState: {
		message: string;
	},
	formData: FormData
) {
	const schema = z
		.object({
			name: z.string().min(1, { message: "Name is required." }),
			email: z.string().email("This is not a valid email.").optional().or(z.literal("")),
			phone: z.string().min(10, { message: "Must be a valid mobile number." }).max(20, { message: "Must be a valid mobile number." }).optional().or(z.literal("")),
		})
		.refine((data) => data.email || data.phone, { message: "Either email or phone must be provided." });

	const parse = schema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		phone: formData.get("phone"),
	});

	if (!parse.success) {
		console.log("error", parse.error.errors);

		return { message: "Validation failed", errors: parse.error.errors };
	}

	const data = parse.data;
	try {
		console.log(data);

		await fetch(`${API.communication}/message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...data }),
		});

		return { message: `Added todo ${data}` };
	} catch (e) {
		return { message: "Failed to create todo", e };
	}
}
