import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

import { IContent } from "@repo/interfaces";
import { updateBlock, updateContent } from "../../lib/content-service";


export function useContentManager(initialContent: IContent) {
    const [content, setContent] = useState<IContent>(initialContent);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const handleAction = async (action: (params: any) => Promise<any>, params: any) => {
        try {
            setIsSaving(true);
            const result = await action(params);

            if (result.success) {
                console.log("Action successful:", params);
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


    const saveContent = useDebouncedCallback((updatedContent) => {
        handleAction(updateContent, updatedContent);
    }, 1000);

    const saveBlock = useDebouncedCallback((updatedBlock) => {
        handleAction(updateBlock, updatedBlock);
    }, 1000);



    return {
        handleAction,
        content,
        isSaving,
        setContent,
        saveContent,
        saveBlock,
    };
}
