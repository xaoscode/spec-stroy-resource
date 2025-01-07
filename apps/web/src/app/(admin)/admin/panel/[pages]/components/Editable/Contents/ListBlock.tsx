import { IContent } from "@repo/interfaces";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { ToastContainer } from "react-toastify";
import { useContentManager } from "./hooks/use-Content-Manager";
import { addBlockAction, deleteAction } from "../lib/content-service";
import { X } from "lucide-react";


export function ListBlock({ initialContent }: { initialContent: IContent }) {
    const { content, isSaving, handleAction, saveBlock, saveContent } = useContentManager(initialContent);



    return (
        <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="flex flex-col justify-between gap-6">
                <input
                    type="text"
                    defaultValue={ content.header }
                    onChange={ (e) =>
                        saveContent({ ...content, header: e.target.value })
                    }
                    placeholder="Введите заголовок"
                    className="w-full text-center font-semibold text-lg p-2 border rounded"
                />
                { content.block.map((block, index) => (
                    <ul key={ index } className="text-center space-y-3 relative">
                        <li className="flex flex-row gap-5 justify-center items-center">
                            <input
                                type="text"
                                defaultValue={ block.text }
                                onChange={ (e) =>
                                    saveBlock({ content: { ...block, text: e.target.value } })
                                }
                                placeholder="Введите элемент списка"
                                className="w-full  text-lg p-2 border rounded"
                            />
                            <AdminButton
                                onClick={ () => handleAction(deleteAction, { id: block.id, childTable: "block", parentTable: "content", parentId: content.id }) }
                                variant="remove"
                                size="icon"
                            >
                                <X />
                            </AdminButton>
                        </li>
                    </ul>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                <AdminButton
                    onClick={ () =>
                        handleAction(addBlockAction, {
                            header: "",
                            text: "",
                            image: "",
                            index: content.block.length + 1,
                            contentId: content.id,
                        })
                    }
                    variant="add"
                >
                    Добавить блок
                </AdminButton>
                <ToastContainer />
                { isSaving && <p className="text-gray-500 text-sm">Сохранение...</p> }
            </div>
        </div>
    );
}
