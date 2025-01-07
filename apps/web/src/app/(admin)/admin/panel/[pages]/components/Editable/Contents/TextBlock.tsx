import { IContent } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { addBlockAction, deleteAction } from "../lib/content-service";
import { useContentManager } from "./hooks/use-Content-Manager";

export function TextBlock({ initialContent }: { initialContent: IContent }) {
    const { content, isSaving, handleAction, saveBlock, saveContent } = useContentManager(initialContent);

    return (
        <div className="flex flex-col p-4 bg-white rounded shadow gap-6">
            <input
                type="text"
                defaultValue={ content.header }
                onChange={ (e) =>
                    saveContent({ ...content, header: e.target.value })
                }
                placeholder="Введите заголовок"
                className="w-full text-center font-semibold text-lg p-2 border rounded"
            />
            { content.block.map((block) => (
                <div key={ block.id } className="flex flex-col gap-5">
                    <AdminButton
                        onClick={ () => handleAction(deleteAction, { id: block.id, childTable: "block", parentTable: "content" }) }
                        variant="remove"
                        className="self-end"
                    >Удалить
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
                    <textarea
                        defaultValue={ block.text }
                        onChange={ (e) =>
                            saveBlock({ content: { ...block, text: e.target.value } })
                        }
                        placeholder="Введите описание"
                        className="w-full  p-2 border rounded outline outline-1"
                    />
                </div>
            )) }
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