"use client"

import { IContent } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { useContentManager } from "./hooks/use-Content-Manager";
import { addBlockAction } from "../lib/content-service";

export function WarningBlock({ initialContent }: { initialContent: IContent }) {
    const { content, isSaving, handleAction, saveBlock, saveContent } = useContentManager(initialContent);

    return (
        <div className="flex flex-col p-4 gap-6 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow">
            <input
                type="text"
                defaultValue={ content.header }
                onChange={ (e) =>
                    saveContent({ ...content, header: e.target.value })
                }
                placeholder="Введите заголовок"
                className="w-full text-center font-semibold text-lg p-2 border rounded"
            />
            { initialContent.block.map((block) => (
                <div key={ block.id } className="flex flex-col gap-5">
                    <input
                        type="text"
                        defaultValue={ block.header }
                        onChange={ (e) =>
                            saveBlock({ content: { ...block, header: e.target.value } })
                        }
                        placeholder="Введите заголовок"
                        className="w-full text-center font-semibold text-lg p-2 border rounded"
                    />
                    <textarea
                        defaultValue={ block.text }
                        onChange={ (e) =>
                            saveBlock({ content: { ...block, text: e.target.value } })
                        }
                        placeholder="Введите описание"
                        className="w-full  bg-white p-2 border rounded "
                    />
                </div>
            )) }
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
            { isSaving && (
                <p className="text-gray-500 text-sm">Сохранение...</p>
            ) }
        </div>
    )
};


