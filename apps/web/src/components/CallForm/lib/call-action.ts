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
			name: z.string(),
			email: z.string().email("Введите действительный адрес электронной почты.").optional().or(z.literal("")),
			phone: z
				.string()
				.optional()
				.or(z.literal(""))
				.refine((phone) => !phone || phone.length === 18, { message: "Phone must be exactly 15 characters if provided." }),
		})
		.refine((data) => data.email || data.phone, { message: "Необходимо указать либо электронную почту, либо телефон." });

	const parse = schema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		phone: formData.get("phone"),
	});

	if (!parse.success) {
		console.log("error", parse.error.errors);

		return { message: parse.error.errors[0].message };
	}

	const data = parse.data;
	try {
		const response = await fetch(`${API.communication}/message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...data }),
		});
		if (response.status === 429) {
			return { message: "Превышено количество запросов. Попробуйте позже." };
		}

		if (!response.ok) {
			return { message: "Не удалось обработать запрос." };
		}
		return { message: `` };
	} catch (e) {
		return { message: "Failed to create todo", e };
	}
}
