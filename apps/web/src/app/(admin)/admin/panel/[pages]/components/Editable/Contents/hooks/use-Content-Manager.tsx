import { useState } from "react";
import { IContent } from "@repo/interfaces";
import { updateContent } from "../../_lib/content-service";

export function useContentManager(initialContent: IContent) {
    const [content, setContent] = useState({
        ...initialContent,
        header: initialContent.header || [],
        text: initialContent.text || [],
        images: initialContent.images || [],
    });
    const [isChanged, setIsChanged] = useState(false);

    const handleFieldChange = (field: keyof IContent, index: number, value: string | File) => {
        setContent((prev) => {
            const fieldData = prev[field];
            if (Array.isArray(fieldData)) {
                const updatedField = [...fieldData];
                if (field === "images" && value instanceof File) {
                    updatedField[index] = URL.createObjectURL(value);
                } else if (typeof value === "string") {
                    updatedField[index] = value;
                }
                return { ...prev, [field]: updatedField };
            }
            return prev; // Если поле не массив, возвращаем предыдущее состояние
        });
    };

    const handleAddBlock = () => {
        setContent((prev) => ({
            ...prev,
            header: [...prev.header, ""],
            text: [...prev.text, ""],
            images: prev.images ? [...prev.images, ""] : [],
        }));
        setIsChanged(true);
    };

    const handleRemoveBlock = (index: number) => {
        setContent((prev) => ({
            ...prev,
            header: prev.header.filter((_, i) => i !== index),
            text: prev.text.filter((_, i) => i !== index),
            images: prev.images?.filter((_, i) => i !== index) || [],
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

    return {
        content,
        isChanged,
        handleFieldChange,
        handleAddBlock,
        handleRemoveBlock,
        handleSave,
    };
}
