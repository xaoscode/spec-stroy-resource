"use client"
import { IContent } from "@repo/interfaces";

import { toast } from "react-toastify";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { updateContent } from "../lib/content-service";
import { AdminInput } from "../../../../components/AdminInput/AdminInput";

export function ComButton({ initialContent }: { initialContent: IContent }) {
    const [isSaving, setIsSaving] = useState(false);
    const handleAction = useDebouncedCallback(async (content: IContent) => {
        try {
            setIsSaving(true);
            const result = await updateContent(content);

            if (result.success) {
                console.log("Action successful:", content);
                toast.success("Изменения сохранены!");
            } else {
                toast.error("Не удалось выполнить действие");
            }
        } catch (error) {
            console.error("Error during action:", error);
            toast.error("Произошла ошибка");
        } finally {
            setIsSaving(false);
        }
    }, 500)
    return (
        <div className="flex flex-col p-4 bg-white rounded shadow gap-6">

            <AdminInput
                type="text"
                inputSize="small"
                defaultValue={ initialContent.text }
                onChange={ (e) =>
                    handleAction({ ...initialContent, text: e.target.value })
                }
                placeholder="Введите содержание кнопки"
                className="text-center "
            />

            <div className="flex flex-col items-center mt-4 space-y-4">

                { isSaving && (
                    <p className="text-gray-500 text-sm">Сохранение...</p>
                ) }
            </div>
        </div>
    );
}