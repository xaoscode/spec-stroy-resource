import { IBlock, IContent, INewBlock } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { addBlockAction, deleteAction, updateBlock, updateContent } from "../lib/content-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import { content } from "../../../../../../../../../tailwind.config";
import { AdminInput } from "../../../../components/AdminInput/AdminInput";

export function TextBlock({ initialContent }: { initialContent: IContent }) {

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


    return (
        <div className="flex flex-col p-4 bg-white rounded shadow gap-6">
            <AdminInput
                inputSize="medium"
                type="text"
                defaultValue={ initialContent.header }
                onChange={ (e) =>
                    updateContentHandle({ ...initialContent, header: e.target.value })
                }
                placeholder="Заголовок текстового блока"
                className="font-"

            />
            { initialContent.block.map((block) => (
                <div key={ block.id } className="flex flex-col gap-5 border-t border-gray-300 pt-4">
                    <AdminButton
                        onClick={ () =>
                            deleteHandle({ id: block.id, childTable: "block", parentTable: "content", parentId: initialContent.id })
                        }
                        variant="remove"
                        className="self-end"
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
                        placeholder="Заголовок текста"

                    />
                    <textarea
                        defaultValue={ block.text }
                        onChange={ (e) =>
                            updateBlockHandle({ content: { ...block, text: e.target.value } })
                        }
                        placeholder="Введите описание"
                        className="w-full p-2 border rounded outline-none focus:outline-none focus:ring-1 focus:ring-gray-400 shadow"
                    />
                </div>
            )) }
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