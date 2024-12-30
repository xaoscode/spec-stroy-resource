import { IContent } from "@repo/interfaces";
import { useState } from "react";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { updateContent } from "../_lib/content-service";

export function TextBlock({ initialContent }: { initialContent: IContent }) {
    const [content, setContent] = useState({
        ...initialContent,
        header: initialContent.header || [],
        text: initialContent.text || [],
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
    const handleSave = async () => {
        try {
            const result = await updateContent(content);

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
    return (
        <div className="flex flex-col p-4 bg-white rounded shadow gap-6">

            <input
                type="text"
                value={ content.header[0] || "" }
                onChange={ (e) => handleHeaderChange(0, e.target.value) }
                placeholder="Введите заголовок"
                className="w-full text-center font-semibold text-lg p-2 border rounded"
            />
            <textarea
                value={ content.text[0] || "" }
                onChange={ (e) => handleTextChange(0, e.target.value) }
                placeholder="Введите описание"
                className="w-full text-center p-2 border rounded outline outline-1"
            />
            <div className="flex flex-col items-center mt-4 space-y-4">

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