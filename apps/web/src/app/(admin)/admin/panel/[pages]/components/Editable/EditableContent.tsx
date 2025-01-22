"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IContent, INewContent } from "@repo/interfaces";
import { addContentAction, deleteAction, reorderAction } from "./lib/content-service";
import { AdminButton } from "../../../components/AdminButton/AdminButton";
import { RenderContentBlock } from "./Contents/Contents";

const contentTypes = ["Текст", "Картинки с текстом", "Список", "Предупреждение", "Прайс-лист", "Кнопка связи", "Файл"];

export function EditableContent({ contents = [], sectionId = "" }: { contents?: IContent[], sectionId?: string, pageId?: string }) {
    const [optimisticItems, setOptimisticItems] = useState(contents);

    useEffect(() => {
        setOptimisticItems(contents)
    }, [contents, optimisticItems])


    const onDragEndAction = async (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const sourceContentId = optimisticItems[sourceIndex].id;
        const destinationPosition = optimisticItems[destinationIndex].index;

        await reorderAction(sectionId, sourceContentId, destinationPosition, "section", "content");
    };

    const addNewItem = async (type: string) => {
        const newItem: INewContent = {
            type: type,
            index: contents.length + 1,
            sectionId: sectionId,

        };

        await addContentAction(newItem, sectionId);
    };

    const deleteContent = async (contentId: string) => {

        await deleteAction({ id: contentId, childTable: "content", parentTable: "section", parentId: sectionId });


    };



    return (
        <div className="flex flex-col min-w-full  gap-5">



            <DragDropContext onDragEnd={ onDragEndAction }>
                <Droppable droppableId="0">
                    { (provided) => (
                        <div
                            ref={ provided.innerRef }
                            { ...provided.droppableProps }
                            className="w-full min-w-full bg-white shadow-md rounded-lg p-4"
                        >
                            { optimisticItems.map((item, index) => (
                                <Draggable key={ item.id } draggableId={ item.id } index={ index }>
                                    { (provided, snapshot) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.draggableProps }
                                            className={ `flex items-center p-4 mb-2 bg-gray-200 rounded-lg shadow-sm ${snapshot.isDragging ? "bg-green-300" : ""
                                                }` }
                                        >

                                            <div className="flex-1 ml-4">
                                                <div className="flex flex-row justify-between">
                                                    <h3 >
                                                        { item.type }
                                                    </h3>
                                                    <AdminButton
                                                        onClick={ () => deleteContent(item.id) }
                                                        variant="remove"
                                                    >
                                                        Удалить контент
                                                    </AdminButton>
                                                </div>

                                                <RenderContentBlock key={ index } content={ item } />
                                                <p className="text-sm text-gray-500">{ item.id }</p>
                                            </div>
                                            <div
                                                { ...provided.dragHandleProps }
                                                className="flex items-center pl-4  border-gray-600 cursor-grab text-gray-600 hover:text-gray-800"
                                            >
                                                <GripVertical />
                                            </div>

                                        </div>
                                    ) }
                                </Draggable>
                            )) }
                            { provided.placeholder }
                        </div>
                    ) }
                </Droppable>
            </DragDropContext>
            <DropdownMenu>
                <DropdownMenuTrigger className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow w-[300px]">
                    Добавить контент
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    { contentTypes.map((type, i) => (
                        <DropdownMenuItem key={ i } onClick={ () => addNewItem(type) }>
                            { type }
                        </DropdownMenuItem>
                    )) }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
