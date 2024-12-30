import { IContent } from "@repo/interfaces";
import { useState } from "react";
import { AdminButton } from "../../../../components/AdminButton/AdminButton";
import { updateContent } from "../_lib/content-service";

export function ListBlock({ initialContent }: { initialContent: IContent }) {
    const [content, setContent] = useState({
        ...initialContent,
        header: initialContent.header || [],
        text: initialContent.text || [],
        images: initialContent.images || [],
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


    const handleAddBlock = () => {
        setContent((prev) => ({
            ...prev,
            text: [...prev.text, ""],
        }));
        setIsChanged(true);
    };

    const handleRemoveBlock = (index: number) => {
        setContent((prev) => ({
            ...prev,
            text: prev.text.filter((_, i) => i !== index),
        }));

        setIsChanged(true);
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
        <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md">

            <div className="flex flex-col  justify-between gap-6">
                <input
                    type="text"
                    value={ content.header[0] || "" }
                    onChange={ (e) => handleHeaderChange(0, e.target.value) }
                    placeholder="Введите заголовок"
                    className="w-full text-center font-semibold text-lg p-2 border rounded"
                />
                { content.text.map((_, index) => (
                    <ul key={ index } className="text-center space-y-3 relative">
                        <li className="flex flex-row gap-5 justify-center items-center">
                            <input
                                type="text"
                                value={ content.text[index] || "" }
                                onChange={ (e) => handleTextChange(index, e.target.value) }
                                placeholder="Введите элемент списка"
                                className="w-full  font-semibold text-lg p-2 border rounded"
                            />
                            <AdminButton
                                onClick={ () => handleRemoveBlock(index) }
                                variant="remove"
                            >
                                Удалить
                            </AdminButton>
                        </li>
                    </ul>
                )) }
            </div>

            <div className="flex flex-col items-center mt-4 space-y-4">
                <AdminButton
                    onClick={ handleAddBlock }
                    variant="add"
                >
                    Добавить элемент списка
                </AdminButton>
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
};