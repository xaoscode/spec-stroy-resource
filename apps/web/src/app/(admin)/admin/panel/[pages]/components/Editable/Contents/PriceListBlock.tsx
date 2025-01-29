import { IBlock, IContent, INewBlock } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { X } from "lucide-react";
import { addBlockAction, deleteAction, updateBlock, updateContent } from "../lib/content-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import { content } from "../../../../../../../../../tailwind.config";
import { AdminInput } from "../../../../components/AdminInput/AdminInput";

export function PriceListBlock({ initialContent }: { initialContent: IContent }) {
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
        <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-md">
            <AdminInput
                inputSize="medium"
                type="text"
                defaultValue={ initialContent.header }
                onChange={ (e) =>
                    updateContentHandle({ ...initialContent, header: e.target.value })
                }
                placeholder="Введите заголовок"
                className="font-"

            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-gray-300 pt-4">
                { initialContent.block.map((block, index) => (
                    <div
                        key={ index }
                        className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-center space-y-4"
                    >
                        <AdminButton
                            onClick={ () => deleteHandle({ id: block.id, childTable: "block", parentTable: "content", parentId: initialContent.id }) }
                            variant="remove"
                            size="icon"
                            className="self-end"
                        >
                            <X />
                        </AdminButton>
                        <input
                            type="text"
                            defaultValue={ block.header }
                            onChange={ (e) =>
                                updateBlockHandle({ content: { ...block, header: e.target.value } })
                            }
                            placeholder="Введите название услуги"
                            className="text-2xl font-bold text-primary w-full text-center border-b p-2 focus:outline-none"
                        />
                        <input
                            type="number"
                            defaultValue={ block.text }

                            onChange={ (e) =>
                                updateBlockHandle({ content: { ...block, text: e.target.value } })
                            }
                            placeholder="Введите цену"
                            className="text-2xl font-bold text-green-500 w-full text-center border rounded p-2 focus:outline-none"
                        />

                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
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
                { isSaving && (
                    <p className="text-gray-500 text-sm">Сохранение...</p>
                ) }
            </div>
        </div>
    );
}
