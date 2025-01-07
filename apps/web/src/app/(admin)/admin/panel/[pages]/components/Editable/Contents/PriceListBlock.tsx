import { IContent } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { X } from "lucide-react";
import { useContentManager } from "./hooks/use-Content-Manager";
import { addBlockAction, deleteAction } from "../lib/content-service";

export function PriceListBlock({ initialContent }: { initialContent: IContent }) {
    const { content, isSaving, handleAction, saveBlock, saveContent } = useContentManager(initialContent);

    return (
        <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-md">
            <input
                type="text"
                defaultValue={ content.header }
                onChange={ (e) =>
                    saveContent({ ...content, header: e.target.value })
                }
                placeholder="Введите заголовок"
                className="w-full text-center font-semibold text-lg p-2 border rounded"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                { content.block.map((block, index) => (
                    <div
                        key={ index }
                        className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-center space-y-4"
                    >
                        <AdminButton
                            onClick={ () => handleAction(deleteAction, { id: block.id, childTable: "block", parentTable: "content" }) }
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
                                saveBlock({ content: { ...block, header: e.target.value } })
                            }
                            placeholder="Введите название услуги"
                            className="text-2xl font-bold text-primary w-full text-center border-b p-2 focus:outline-none"
                        />
                        <input
                            type="number"
                            defaultValue={ block.text }

                            onChange={ (e) =>
                                saveBlock({ content: { ...block, text: e.target.value } })
                            }
                            placeholder="Введите цену"
                            className="text-2xl font-bold text-green-500 w-full text-center border rounded p-2 focus:outline-none"
                        />

                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
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
        </div>
    );
}
