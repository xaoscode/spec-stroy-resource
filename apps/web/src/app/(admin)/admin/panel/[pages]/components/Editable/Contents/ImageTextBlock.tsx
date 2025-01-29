"use client";

import Image from "next/image";
import { IBlock, IContent, INewBlock } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { addBlockAction, deleteAction, updateBlock, updateContent } from "../lib/content-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import { content } from "../../../../../../../../../tailwind.config";
import { AdminInput } from "../../../../components/AdminInput/AdminInput";

export function ImageTextBlock({ initialContent }: { initialContent: IContent }) {

    const [isSaving, setIsSaving] = useState(false);

    const updateContentHandle = useDebouncedCallback(async (content: IContent) => {
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

    const updateBlockHandle = useDebouncedCallback(async (data: { content: IBlock; file?: File }) => {
        try {
            setIsSaving(true);
            const result = await updateBlock(data);

            if (result.success) {
                console.log("Action successful:", data);
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


    const addBlockHandle = async (data: INewBlock) => {
        try {
            setIsSaving(true);
            const result = await addBlockAction(data);

            if (result.success) {
                console.log("Action successful:", data);
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
    }

    const deleteHandle = async (data: { id: string; childTable: string; parentTable: string; parentId: string }) => {
        try {
            setIsSaving(true);
            const result = await deleteAction(data);

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
    }

    const triggerFileInput = (id: string) => {
        const fileInput = document.getElementById(`file-input-${id}`) as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md gap-5">
            <AdminInput
                inputSize="medium"
                type="text"
                defaultValue={ initialContent.header }
                onChange={ (e) =>
                    updateContentHandle({ ...initialContent, header: e.target.value })
                }
                placeholder="Введите заголовок"

            />
            <div className="flex flex-col lg:flex-row justify-between gap-6  border-t border-gray-300 pt-4">

                { initialContent.block.map((block) => (
                    <div key={ block.id } className="flex-1 text-center space-y-3 relative">
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <AdminButton
                                onClick={ () => deleteHandle({ id: block.id, childTable: "block", parentTable: "content", parentId: initialContent.id }) }
                                variant="remove"
                            >
                                Удалить
                            </AdminButton>
                            <AdminInput
                                type="text"
                                inputSize="small"
                                defaultValue={ block.header }
                                onChange={ (e) =>
                                    updateBlockHandle({ content: { ...block, header: e.target.value } })
                                }

                            />
                            <div
                                onClick={ () => triggerFileInput(block.id) }
                                className="cursor-pointer border rounded-md shadow p-2 w-64 h-64 flex items-center justify-center bg-gray-100"
                            >
                                { block.image ? (
                                    <Image
                                        src={ block.image }
                                        alt={ `Изображение ${block.id}` }
                                        width={ 300 }
                                        height={ 300 }
                                        className="rounded-md object-contain max-w-full"
                                        priority
                                    />
                                ) : (
                                    <span className="text-gray-500">Нажмите, чтобы добавить изображение типов jpg, jpeg, png, gif, svg</span>
                                ) }
                            </div>
                            <input
                                id={ `file-input-${block.id}` }
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={ (e) => {
                                    if (e.target.files) {
                                        const file = e.target.files[0];

                                        updateBlockHandle({ content: { ...block, image: file.name }, file: file });
                                    }
                                } }
                            />
                            <textarea
                                defaultValue={ block.text }
                                onChange={ (e) =>
                                    updateBlockHandle({ content: { ...block, text: e.target.value } })
                                }
                                placeholder="Введите описание"
                                className="w-full text-center p-2 border rounded outline outline-1"
                            />
                        </div>
                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                { initialContent.block.length < 3 && (
                    <AdminButton onClick={ () =>
                        addBlockHandle({
                            header: "",
                            text: "",
                            image: "",
                            index: initialContent.block.length + 1,
                            contentId: initialContent.id,
                        }) } variant="add">
                        Добавить блок
                    </AdminButton>
                ) }
                { isSaving && (
                    <p className="text-gray-500 text-sm">Сохранение...</p>
                ) }
            </div>
        </div>
    );
}
