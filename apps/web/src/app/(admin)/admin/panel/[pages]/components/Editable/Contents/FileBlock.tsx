"use client";
import { IBlock, IContent, INewBlock } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { addBlockAction, deleteAction, updateBlock, updateContent } from "../lib/content-service";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

export function FileBlock({ initialContent }: { initialContent: IContent }) {
    const [isSaving, setIsSaving] = useState(false);

    const updateContentHandle = useDebouncedCallback(async (content: IContent) => {
        try {
            setIsSaving(true);
            const result = await updateContent(content);
            if (result.success) {
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
    }, 500);

    const updateBlockHandle = useDebouncedCallback(async (data: { content: IBlock; file?: File }) => {
        try {
            setIsSaving(true);
            const result = await updateBlock(data);
            if (result.success) {
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
    }, 500);

    const addBlockHandle = async (data: INewBlock) => {
        try {
            setIsSaving(true);
            const result = await addBlockAction(data);
            if (result.success) {
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
    };

    const deleteHandle = async (data: { id: string; childTable: string; parentTable: string; parentId: string }) => {
        try {
            setIsSaving(true);
            const result = await deleteAction(data);
            if (result.success) {
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
    };

    // Обработчик для загрузки файлов
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, block: IBlock) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                updateBlockHandle({ content: { ...block, image: file.name }, file });
            } else {
                toast.error("Пожалуйста, выберите файл PDF, DOC или DOCX.");
            }
        }
    };

    return (
        <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="flex flex-col justify-between gap-6">
                <input
                    type="text"
                    defaultValue={ initialContent.header }
                    onChange={ (e) =>
                        updateContentHandle({ ...initialContent, header: e.target.value })
                    }
                    placeholder="Введите заголовок"
                    className="w-full text-center font-semibold text-lg p-2 border rounded"
                />
                { initialContent.block.map((block, index) => (
                    <ul key={ index } className="text-center space-y-3 relative">
                        <li className="flex flex-row gap-5 justify-center items-center">
                            <input
                                type="text"
                                defaultValue={ block.text }
                                onChange={ (e) =>
                                    updateBlockHandle({ content: { ...block, text: e.target.value } })
                                }
                                placeholder="Введите элемент списка"
                                className="w-full text-lg p-2 border rounded"
                            />
                            <AdminButton
                                onClick={ () =>
                                    deleteHandle({
                                        id: block.id,
                                        childTable: "block",
                                        parentTable: "content",
                                        parentId: initialContent.id,
                                    })
                                }
                                variant="remove"
                                size="icon"
                            >
                                <X />
                            </AdminButton>
                        </li>

                        {/* Добавление файла */ }
                        <div className="flex flex-col items-center gap-3">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="border p-2 rounded"
                                onChange={ (e) => handleFileChange(e, block) }
                            />
                            { block.image && (
                                <div>
                                    <a href={ `/files/${block.image}` } target="_blank" className="text-blue-500">
                                        Скачать файл: { block.image }
                                    </a>
                                </div>
                            ) }
                        </div>
                    </ul>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                <AdminButton
                    onClick={ () =>
                        addBlockHandle({
                            header: "",
                            text: "",
                            image: "",
                            index: initialContent.block.length + 1,
                            contentId: initialContent.id,
                        })
                    }
                    variant="add"
                >
                    Добавить блок
                </AdminButton>

                { isSaving && <p className="text-gray-500 text-sm">Сохранение...</p> }
            </div>
        </div>
    );
}
