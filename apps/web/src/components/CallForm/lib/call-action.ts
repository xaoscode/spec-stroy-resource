import { API } from "@/app/api";
import { z } from "zod";

export async function NewMessageAction(prevState: { error: string; message: string }, formData: FormData) {
	const schema = z
		.object({
			name: z.string(),
			email: z.string().email("Введите действительный адрес электронной почты.").optional().or(z.literal("")),
			phone: z.string().min(10, { message: "Телефон должен содержать не менее 10 символов." }).optional(),
			terms: z.literal(true, {
				errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных." }),
			}),
		})
		.refine((data) => data.email || data.phone, { message: "Необходимо указать либо электронную почту, либо телефон." });

	const parse = schema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		phone: formData.get("phone"),
		terms: formData.get("terms") === "on",
	});

	if (!parse.success) {
		return { error: parse.error.errors[0].message, message: "" };
	}

	try {
		const response = await fetch(`${API.communication}/message`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(parse.data),
		});
		if (response.status === 429) {
			return { error: "Превышено количество запросов. Попробуйте позже.", message: "" };
		}

		if (!response.ok) {
			return { error: "Не удалось обработать запрос.", message: "" };
		}

		return { message: "Ваше обращение успешно создано", error: "" };
	} catch {
		return { error: "Ошибка при отправке данных", message: "" };
	}
}
