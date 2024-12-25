"use client"
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Item = {
    id: string;
    content: string;
    blya: string;
    type: string;
};

const getItems = (count: number, offset: number = 0): Item[] =>
    Array.from({ length: count }, (_, k) => ({
        id: `item-${k + offset}`,
        content: `Item ${k + offset + 1}`,
        blya: `Additional info ${JSON.stringify(offset + k)}`,
        type: "Text",
    }));

const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, index) => ({ ...item, content: `Item ${index + 1}` }));
};

const contentTypes = ["Текст", "Картинки с текстом", "Список", "Предупреждение"];

export function QuoteApp() {
    const [items, setItems] = useState<Item[]>(getItems(5));

    const addNewItem = (type: string) => {
        const newItem: Item = {
            id: `item-${items.length}`,
            content: `Item ${items.length + 1}`,
            blya: `Additional info ${JSON.stringify(items.length)}`,
            type,
        };
        setItems((prev) => [...prev, newItem]);
    };

    function onDragEnd(result: any): void {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        // Optimistically update the items list before actual reorder
        const reorderedItems = reorder(items, source.index, destination.index);
        setItems(reorderedItems)  // This will apply the optimistic update
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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

            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId="0">
                    { (provided, snapshot) => (
                        <div
                            ref={ provided.innerRef }
                            { ...provided.droppableProps }
                            className={ `w-full max-w-md bg-white shadow-md rounded-lg p-4 ${snapshot.isDraggingOver ? "bg-blue-100" : ""}` }
                        >
                            { items.map((item, index) => (
                                <Draggable key={ item.id } draggableId={ item.id } index={ index }>
                                    { (provided, snapshot) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.draggableProps }
                                            className={ `flex items-center p-4 mb-2 bg-gray-200 rounded-lg shadow-sm ${snapshot.isDragging ? "bg-green-300" : ""}` }
                                        >
                                            <div
                                                { ...provided.dragHandleProps }
                                                className="flex items-center pr-4 border-r border-gray-600 cursor-grab text-gray-600 hover:text-gray-800"
                                            >
                                                <GripVertical />
                                            </div>
                                            <div className="flex-1 ml-4">
                                                <p className="text-lg font-semibold text-gray-700">
                                                    { item.type } - { item.content }
                                                </p>
                                                <p className="text-sm text-gray-500">{ item.blya }</p>
                                            </div>
                                            <div
                                                { ...provided.dragHandleProps }
                                                className="flex items-center pl-4 border-l border-gray-600 cursor-grab text-gray-600 hover:text-gray-800"
                                            >
                                                <button
                                                    onClick={ () => {
                                                        const updatedItems = items.filter((_, i) => i !== index);
                                                        setItems(updatedItems);
                                                    } }
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
