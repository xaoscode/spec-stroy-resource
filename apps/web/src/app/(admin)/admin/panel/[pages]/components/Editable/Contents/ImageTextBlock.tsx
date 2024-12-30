"use client";

import { useState } from "react";
import Image from "next/image";
import { IContent } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { updateBlock } from "../_lib/content-service";

export function ImageTextBlock({ initialContent }: { initialContent: IContent }) {
    const [content, setContent] = useState({
        ...initialContent,
        header: initialContent.header || [],
        text: initialContent.text || [],
        images: initialContent.images || [],
    });
    const [, setIsEditing] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const handleHeaderChange = (index: number, value: string) => {
        setContent((prev) => {
            const updatedHeaders = [...prev.header];
            updatedHeaders[index] = value;
            setIsChanged(true);
            return { ...prev, header: updatedHeaders };
        });
    };

    const handleTextChange = (index: number, value: string) => {
        setContent((prev) => {
            const updatedTexts = [...prev.text];
            updatedTexts[index] = value;
            setIsChanged(true);
            return { ...prev, text: updatedTexts };
        });
    };

    const handleImageChange = (index: number, file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setContent((prev) => {
            const updatedImages = [...prev.images];
            updatedImages[index] = imageUrl;
            setIsChanged(true);
            return { ...prev, images: updatedImages };
        });
    };

    const handleAddBlock = () => {
        if (content.header.length < 3) {
            setContent((prev) => ({
                ...prev,
                header: [...prev.header, ""],
                text: [...prev.text, ""],
                images: [...prev.images, ""],
            }));
            setIsChanged(true);
        }
    };

    const handleRemoveBlock = (index: number) => {
        setContent((prev) => ({
            ...prev,
            header: prev.header.filter((_, i) => i !== index),
            text: prev.text.filter((_, i) => i !== index),
            images: prev.images.filter((_, i) => i !== index),
        }));

        setIsChanged(true);
    };

    const handleSave = async () => {
        try {
            const result = await updateBlock(content);

            if (result.success) {
                console.log("Saving content:", content);
                setIsEditing(false);
                setIsChanged(false);
            } else {
                console.error("Save failed:", result.error);
            }
        } catch (error) {
            console.error("Error saving content:", error);
        }
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
                { content.header.map((_, index) => (
                    <div key={ index } className="flex-1 text-center space-y-3 relative">
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <AdminButton
                                onClick={ () => handleRemoveBlock(index) }
                                variant="remove"
                            >
                                Удалить
                            </AdminButton>
                            <input
                                type="text"
                                value={ content.header[index] || "" }
                                onChange={ (e) => handleHeaderChange(index, e.target.value) }
                                placeholder="Введите заголовок"
                                className="w-full text-center font-semibold text-lg p-2 border rounded"
                            />
                            <div
                                onClick={ () => triggerFileInput(index) }
                                className="cursor-pointer border rounded-md shadow p-2 w-64 h-64 flex items-center justify-center bg-gray-100"
                            >
                                { content.images[index] ? (
                                    <Image
                                        src={
                                            content.images[index].startsWith("blob:")
                                                ? content.images[index]
                                                : `http://localhost:3002/images/${content.images[index]}`
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
                                    handleImageChange(index, e.target.files[0])
                                }
                            />
                            <textarea
                                value={ content.text[index] || "" }
                                onChange={ (e) => handleTextChange(index, e.target.value) }
                                placeholder="Введите описание"
                                className="w-full text-center p-2 border rounded outline outline-1"
                            />
                        </div>
                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                { content.header.length < 3 && (
                    <AdminButton
                        onClick={ handleAddBlock }
                        variant="add"
                    >
                        Добавить блок
                    </AdminButton>
                ) }
                { isChanged && (
                    <AdminButton
                        onClick={ handleSave }
                        variant="save"
                    >
                        Сохранить изменения
                    </AdminButton>
                ) }
            </div>
        </div>
    );
}
