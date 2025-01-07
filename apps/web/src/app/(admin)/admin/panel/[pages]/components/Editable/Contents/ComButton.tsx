import { IContent } from "@repo/interfaces";

import { useContentManager } from "./hooks/use-Content-Manager";

export function ComButton({ initialContent }: { initialContent: IContent }) {
    const { content, isSaving, saveContent } = useContentManager(initialContent);

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
            <input
                type="text"
                defaultValue={ content.text }
                onChange={ (e) =>
                    saveContent({ ...content, text: e.target.value })
                }
                placeholder="Введите заголовок"
                className="w-full text-center font-semibold text-lg p-2 border rounded"
            />

            <div className="flex flex-col items-center mt-4 space-y-4">

                { isSaving && (
                    <p className="text-gray-500 text-sm">Сохранение...</p>
                ) }
            </div>
        </div>
    );
}