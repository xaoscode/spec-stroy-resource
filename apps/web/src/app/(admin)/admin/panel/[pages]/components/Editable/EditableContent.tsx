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
import { addContentAction, deleteAction, reorderAction } from "./_lib/content-service";

const contentTypes = ["Текст", "Картинки с текстом", "Список", "Предупреждение"];

export function EditableContent({ contents = [], sectionId = "" }: { contents?: IContent[], sectionId?: string, pageId?: string }) {
    const [optimisticItems, setOptimisticItems] = useState(contents);
    useEffect(() => {
        setOptimisticItems(contents)
        console.log(optimisticItems)
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
            text: "sdfsf",
            index: contents.length + 1,
            sectionId: sectionId
        };

        await addContentAction(newItem, sectionId);
    };

    const deleteContent = async (sectionId: string) => {

        await deleteAction(sectionId, "content");


    };



    return (
        <div className="flex flex-col items-center justify-center min-w-full bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Блок</h1>

            <DropdownMenu>
                <DropdownMenuTrigger className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
                    Выбор варианта контента
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    { contentTypes.map((type, i) => (
                        <DropdownMenuItem key={ i } onClick={ () => addNewItem(type) }>
                            { type }
                        </DropdownMenuItem>
                    )) }
                </DropdownMenuContent>
            </DropdownMenu>

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
                                            <div
                                                { ...provided.dragHandleProps }
                                                className="flex items-center pr-4 border-r border-gray-600 cursor-grab text-gray-600 hover:text-gray-800"
                                            >
                                                <GripVertical />
                                            </div>
                                            <div className="flex-1 ml-4">
                                                <p className="text-lg font-semibold text-gray-700">
                                                    { item.type } - { item.text }
                                                </p>
                                                <p className="text-sm text-gray-500">{ item.id }</p>
                                            </div>
                                            <div
                                                { ...provided.dragHandleProps }
                                                className="flex items-center p-4 border-l border-gray-600 cursor-grab text-gray-600 hover:text-gray-800"
                                            >
                                                <button
                                                    onClick={ async () => { deleteContent(item.id) } }
                                                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded"
                                                >
                                                    Удалить контент
                                                </button>
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
        </div>
    );
}
