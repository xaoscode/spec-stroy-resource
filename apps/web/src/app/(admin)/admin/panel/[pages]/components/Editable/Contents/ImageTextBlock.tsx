"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";
import { IBlock, INewBlock } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { addBlockAction, updateBlock } from "../_lib/content-service";

export function ImageTextBlock({ initialContent = [], contentId }: { initialContent?: IBlock[], contentId: string }) {
    const [blocks, setBlocks] = useState(initialContent);

    const [isSaving, setIsSaving] = useState(false);

    // useEffect(() => {
    //     setBlocks(initialContent)
    // }, [initialContent])

    const saveContent = async (block: IBlock) => {
        try {
            setIsSaving(true);
            const result = await updateBlock(block);

            if (result.success) {
                console.log("Autosave successful:", block);
            } else {
                console.error("Autosave failed:", result.error);
            }
        } catch (error) {
            console.error("Error saving content:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Используем useDebouncedCallback для вызова сохранения с задержкой
    const debouncedSave = useDebouncedCallback(saveContent, 1000); // Задержка в 1 секунду



    const handleAddBlock = async () => {
        const newBlock: INewBlock = {
            header: "",
            text: "",
            images: "",
            contentId: contentId
        }
        await addBlockAction(newBlock)
    };

    const handleRemoveBlock = () => {

    };

    const triggerFileInput = (index: number) => {
        const fileInput = document.getElementById(`file-input-${index}`) as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                { blocks.map((block, index) => (
                    <div key={ index } className="flex-1 text-center space-y-3 relative">
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <AdminButton
                                onClick={ () => handleRemoveBlock() }
                                variant="remove"
                            >
                                Удалить
                            </AdminButton>
                            <input
                                type="text"
                                value={ block.header }
                                onChange={ (e) =>
                                    debouncedSave({ ...block, header: e.target.value })
                                }
                                placeholder="Введите заголовок"
                                className="w-full text-center font-semibold text-lg p-2 border rounded"
                            />
                            <div
                                onClick={ () => triggerFileInput(index) }
                                className="cursor-pointer border rounded-md shadow p-2 w-64 h-64 flex items-center justify-center bg-gray-100"
                            >
                                { block.images ? (
                                    <Image
                                        src={
                                            block.images.startsWith("blob:")
                                                ? block.images
                                                : `http://localhost:3002/images/${block.images}`
                                        }
                                        alt={ `Изображение ${index + 1}` }
                                        width={ 300 }
                                        height={ 300 }
                                        className="rounded-md object-contain max-w-full"
                                    />
                                ) : (
                                    <span className="text-gray-500">Нажмите, чтобы добавить изображение</span>
                                ) }
                            </div>
                            <input
                                id={ `file-input-${index}` }
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={ (e) =>
                                    e.target.files &&
                                    debouncedSave({ ...block, images: e.target.value })

                                }
                            />
                            <textarea
                                value={ block.text }
                                onChange={ (e) =>
                                    debouncedSave({ ...block, text: e.target.value })

                                }
                                placeholder="Введите описание"
                                className="w-full text-center p-2 border rounded outline outline-1"
                            />
                        </div>
                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                { blocks.length < 3 && (
                    <AdminButton onClick={ handleAddBlock } variant="add">
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
