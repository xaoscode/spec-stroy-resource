import { IContent } from "@repo/interfaces";
import { useContentManager } from "./hooks/use-Content-Manager";


export function FileBlock({ initialContent }: { initialContent: IContent }) {
    const { content, isSaving, handleAction, saveBlock, saveContent } = useContentManager(initialContent);



    return (
        <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md">


        </div>
    );
}
