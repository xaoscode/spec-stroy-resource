"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IContent } from "@repo/interfaces";
import { swapContentAction, uploadContentService } from "./UploadContentForm/_uploda_content_action/content-service";


interface Item extends IContent {
    id: string
}

const contentTypes = ["Текст", "Картинки с текстом", "Список", "Предупреждение"];

export function EditableContent({ contents, sectionId }: { contents: Item[], sectionId: string }) {
    const [optimisticItems, setOptimisticItems] = useState(contents);

    const swapItems = (sourceSectionId: string, destinationSectionId: string) => {
        const sourceIndex = optimisticItems.findIndex((section) => section.id === sourceSectionId);
        const destinationIndex = optimisticItems.findIndex((section) => section.id === destinationSectionId);

        if (sourceIndex === -1 || destinationIndex === -1) return;

        const newItems = [...optimisticItems];
        const temp = newItems[sourceIndex];
        newItems[sourceIndex] = newItems[destinationIndex];
        newItems[destinationIndex] = temp;

        setOptimisticItems(newItems);
    };


    const onDragEndAction = async (result: any) => {
        if (!result.destination || contents.length === 0) return;

        const sourceContentId = result.draggableId;
        const destinationContentd = contents[result.destination.index]?.id;
        swapItems(sourceContentId, destinationContentd);
        swapContentAction(sourceContentId, destinationContentd)

    };


    const addNewItem = async (type: string) => {
        const newItem: Item = {
            contentType: type,
            contentText: "новый контент",
            sectionId: sectionId,
            orderNumber: contents.length + 1
        };




        await uploadContentService(newItem, sectionId)
    };



    return (
        <div className="flex flex-col items-center justify-center min-w-full bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Draggable List</h1>

            <DropdownMenu>
                <DropdownMenuTrigger className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
                    Select Block Type
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
                                <Draggable key={ index } draggableId={ item.id } index={ index }>
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
                                                    { item.contentType } - { item.contentText }
                                                </p>
                                                <p className="text-sm text-gray-500">{ item.id }</p>
                                            </div>
                                            <div
                                                { ...provided.dragHandleProps }
                                                className="flex items-center p-4 border-l border-gray-600 cursor-grab text-gray-600 hover:text-gray-800"
                                            >
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded"
                                                >
                                                    Delete
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
