"use server";
import { IComMesage } from "@repo/interfaces";

export async function newMessage(message: IComMesage) {
	await fetch("http://localhost:3002/api/communication/message", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}
