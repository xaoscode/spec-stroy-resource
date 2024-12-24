"use client";

import React, { useState, useRef, useTransition } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOptimistic } from "react";  // Importing useOptimistic

type Item = {
    id: string;
    content: string;
    blya: string;
    type: string;
};

const contentTypes = ["Текст", "Картинки с текстом", "Список", "Предупреждение"];

export function EditableC() {
    const [items, setItems] = useState<Item[]>([]);
    const [, startTransition] = useTransition(); // For wrapping async operations

    // Using useOptimistic for optimistic state updates
    const [optimisticItems, addOptimisticItem] = useOptimistic(
        items,
        (state, newItem: Item) => [...state, newItem]
    );

    // Function to handle item addition
    const addNewItem = async (type: string) => {
        const newItem: Item = {
            id: `item-${items.length + 1}`,
            content: `Item ${items.length + 1}`,
            blya: `Additional info ${items.length + 1}`,
            type,
        };

        // Use startTransition to wrap the optimistic update
        startTransition(() => {
            addOptimisticItem(newItem); // Optimistic state update
        });


        // Simulate server request
        await fetch("/api/items", {
            method: "POST",
            body: JSON.stringify(newItem),
        });
    };

    // Handle reordering items optimistically
    const onDragEnd = async (result: any) => {
        const { source, destination } = result;
        if (!destination || source.index === destination.index) return;

        // Reordering items optimistically
        const reorderedItems = [...optimisticItems];
        const [removed] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, removed);

        startTransition(() => {
            addOptimisticItem(reorderedItems); // Optimistic state update
        });

        // Simulate server request for reordering
        await fetch("/api/items/reorder", {
            method: "PUT",
            body: JSON.stringify(reorderedItems),
        });
    };

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
                    { (provided) => (
                        <div
                            ref={ provided.innerRef }
                            { ...provided.droppableProps }
                            className="w-full max-w-md bg-white shadow-md rounded-lg p-4"
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
                                                    { item.type } - { item.content }
                                                </p>
                                                <p className="text-sm text-gray-500">{ item.blya }</p>
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
