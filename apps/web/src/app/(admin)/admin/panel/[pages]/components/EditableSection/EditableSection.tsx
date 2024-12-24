"use client";

import React, { useTransition } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

import { useOptimistic } from "react";  // Importing useOptimistic
import { ISection } from "@repo/interfaces";
import { Button } from "@/components/ui/button";
import { EditableContent } from "../EditableContent/EditableContent";
import { uploadSectionService } from "./UploadSectionForm/_uploda_section_action/uplod-section-service";




interface Item extends ISection {
    id: string;
}

export function EditableSection({ sections, pageId }: { sections: Item[], pageId: string }) {
    // const [items, setItems] = useState<Item[]>([]);
    const [, startTransition] = useTransition(); // For wrapping async operations

    // Using useOptimistic for optimistic state updates
    const [optimisticItems, addOptimisticItem] = useOptimistic(
        sections || [],
        (state, newItem: Item) => [...state, newItem]
    );

    // Function to handle item addition
    const addNewItem = async (type: string) => {
        const newItem: Item = {
            title: 'новая секция',
            pageId: pageId,
            type: type,
            orderNumber: sections.length + 1
        };

        // Use startTransition to wrap the optimistic update
        // startTransition(() => {
        //     addOptimisticItem(newItem); // Optimistic state update
        // });


        // Simulate server request
        await uploadSectionService(newItem, pageId)
        // startTransition(() => {
        //     addOptimisticItem(res); // Optimistic state update
        // });
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


            <Button onClick={ () => addNewItem('секция') }> Добавить секцию</Button>

            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId="0">
                    { (provided) => (
                        <div
                            ref={ provided.innerRef }
                            { ...provided.droppableProps }
                            className="w-full max-w-md bg-white shadow-md rounded-lg p-4"
                        >
                            { optimisticItems.map((item: Item, index) => (
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
                                                <EditableContent contents={ item.content } sectionId={ item.id } />

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
        </div >
    );
}
