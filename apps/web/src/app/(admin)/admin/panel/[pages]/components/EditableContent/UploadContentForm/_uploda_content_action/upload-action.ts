"use server";
import { z } from "zod";

// import { signIn, signOut } from "@/auth";

const schemaRegister = z.object({
	email: z.string().email({
		message: "Введите корректный email",
	}),
	password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }).max(100, {
		message: "Пароль должен быть не более 100 символов.",
	}),
});

const schemaLogin = z.object({
	email: z.string().min(3, { message: "email должен быть не менее 6 символов" }).max(20, { message: "email должен быть не более 20 символов" }),
	password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }).max(100, {
		message: "Пароль должен быть не более 100 символов.",
	}),
});

export async function loginAdminAction(prevState: AdminAuthActionState, formData: FormData): Promise<AdminAuthActionState> {
	console.log("Hello From Login Admin Action");
	const validatedFields = schemaLogin.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			message: "Пропущены поля. Ошибка авторизации.",
		};
	}

	// const responseData = await signIn("credentials", { ...validatedFields.data, calbackUrl: "/", redirect: false });

	if (!responseData) {
		return {
			...prevState,
			apiErrors: responseData.message,
			zodErrors: {},
			message: "Что-то не так. Попробуйте еще раз.",
		};
	}
	if (responseData.statusCode === 400) {
		return {
			...prevState,
			apiErrors: responseData.message,
			zodErrors: {},
			message: "Ошибка авторизации.",
		};
	}

	return {
		...prevState,
		data: "ok",
	};
}
