"use client";

import Image from "next/image";
import { IContent } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { addBlockAction, deleteAction, updateBlock } from "../lib/content-service";
import { useContentManager } from "./hooks/use-Content-Manager";

export function ImageTextBlock({ initialContent }: { initialContent: IContent }) {
    const { content, isSaving, handleAction, saveBlock, saveContent } = useContentManager(initialContent);




    const triggerFileInput = (index: number) => {
        const fileInput = document.getElementById(`file-input-${index}`) as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md gap-5">
            <input
                type="text"
                defaultValue={ content.header }
                onChange={ (e) =>
                    saveContent({ ...content, header: e.target.value })
                }
                placeholder="Введите заголовок"
                className="w-full text-center font-semibold text-lg p-2 border rounded"
            />
            <div className="flex flex-col lg:flex-row justify-between gap-6">

                { content.block.map((block, index) => (
                    <div key={ block.id } className="flex-1 text-center space-y-3 relative">
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <AdminButton
                                onClick={ () => handleAction(deleteAction, { id: block.id, childTable: "block", parentTable: "content" }) }
                                variant="remove"
                            >
                                Удалить
                            </AdminButton>
                            <input
                                type="text"
                                defaultValue={ block.header }
                                onChange={ (e) =>
                                    saveBlock({ content: { ...block, header: e.target.value } })
                                }
                                placeholder="Введите заголовок"
                                className="w-full text-center font-semibold text-lg p-2 border rounded"
                            />
                            <div
                                onClick={ () => triggerFileInput(index) }
                                className="cursor-pointer border rounded-md shadow p-2 w-64 h-64 flex items-center justify-center bg-gray-100"
                            >
                                { block.image ? (
                                    <Image
                                        src={ block.image }
                                        alt={ `Изображение ${block.id}` }
                                        width={ 300 }
                                        height={ 300 }
                                        className="rounded-md object-contain max-w-full"
                                    />
                                ) : (
                                    <span className="text-gray-500">Нажмите, чтобы добавить изображение типов jpg, jpeg, png, gif, svg</span>
                                ) }
                            </div>
                            <input
                                id={ `file-input-${index}` }
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={ (e) => {
                                    if (e.target.files) {
                                        const file = e.target.files[0];

                                        handleAction(updateBlock, { content: { ...block, image: file.name }, file: file });
                                    }
                                } }
                            />
                            <textarea
                                defaultValue={ block.text }
                                onChange={ (e) =>
                                    saveBlock({ content: { ...block, text: e.target.value } })
                                }
                                placeholder="Введите описание"
                                className="w-full text-center p-2 border rounded outline outline-1"
                            />
                        </div>
                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                { content.block.length < 3 && (
                    <AdminButton onClick={ () =>
                        handleAction(addBlockAction, {
                            header: "",
                            text: "",
                            image: "",
                            index: content.block.length + 1,
                            contentId: content.id,
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
