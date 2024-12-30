import { IContent } from "@repo/interfaces";
import { useState } from "react";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { updateContent } from "../_lib/content-service";
import { X } from "lucide-react";

export function PriceListBlock({ initialContent }: { initialContent: IContent }) {
    const [content, setContent] = useState({
        ...initialContent,
        header: initialContent.header || [],
        text: initialContent.text || [],
    });
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

    const handleAddBlock = () => {
        setContent((prev) => ({
            ...prev,
            header: [...prev.header, ""],
            text: [...prev.text, ""],
        }));
        setIsChanged(true);
    };

    const handleRemoveBlock = (index: number) => {
        setContent((prev) => ({
            ...prev,
            header: prev.header.filter((_, i) => i !== index),
            text: prev.text.filter((_, i) => i !== index),
        }));

        setIsChanged(true);
    };

    const handleSave = async () => {
        try {
            const result = await updateContent(content);
            if (result.success) {
                console.log("Saving content:", content);
                setIsChanged(false);
            } else {
                console.error("Save failed:", result.error);
            }
        } catch (error) {
            console.error("Error saving content:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                { content.header.map((_, index) => (
                    <div
                        key={ index }
                        className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-center space-y-4"
                    >
                        <AdminButton
                            onClick={ () => handleRemoveBlock(index) }
                            variant="remove"
                            size="icon"
                            className="self-end"
                        >
                            <X />
                        </AdminButton>
                        <input
                            type="text"
                            value={ content.header[index] || "" }
                            onChange={ (e) => handleHeaderChange(index, e.target.value) }
                            placeholder="Введите название услуги"
                            className="text-2xl font-bold text-primary w-full text-center border-b p-2 focus:outline-none"
                        />
                        <input
                            type="number"
                            value={ content.text[index] || "" }
                            onChange={ (e) => handleTextChange(index, e.target.value) }
                            placeholder="Введите цену"
                            className="text-2xl font-bold text-green-500 w-full text-center border rounded p-2 focus:outline-none"
                        />

                    </div>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                <AdminButton onClick={ handleAddBlock } variant="add">
                    Добавить блок
                </AdminButton>
                { isChanged && (
                    <AdminButton onClick={ handleSave } variant="save">
                        Сохранить изменения
                    </AdminButton>
                ) }
            </div>
        </div>
    );
}
