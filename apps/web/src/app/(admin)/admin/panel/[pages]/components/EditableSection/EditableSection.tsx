"use client"
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { ISection } from "@repo/interfaces";
import { Button } from "@/components/ui/button";
import { deletSectionsAction, swapSectionsAction, uploadSectionService } from "./UploadSectionForm/_uploda_section_action/section-service"; // Подключаем deleteSectionService
import { EditableContent } from "../EditableContent/EditableContent";

interface Item extends ISection {
    id: string;
}

export function EditableSection({ sections, pageId }: { sections: Item[], pageId: string }) {
    const [optimisticItems, setOptimisticItems] = useState(sections);
    useEffect(() => {
        setOptimisticItems(sections)
    }, [sections])
    const swapItems = (sourceIndex: number, destinationIndex: number) => {
        const newItems = [...optimisticItems];
        const temp = newItems[sourceIndex];
        newItems[sourceIndex] = newItems[destinationIndex];
        newItems[destinationIndex] = temp;
        setOptimisticItems(newItems);
    };

    const onDragEndAction = async (result: any) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const prevState = [...optimisticItems];

        swapItems(sourceIndex, destinationIndex);

        try {
            const sourceSectionId = optimisticItems[sourceIndex].id;
            const destinationSectionId = optimisticItems[destinationIndex].id;

            await swapSectionsAction(sourceSectionId, destinationSectionId);
        } catch (error) {
            setOptimisticItems(prevState);
            console.error("Ошибка на сервере, откатываем изменения:", error);
        }
    };

    const addNewItem = async (type: string) => {
        const newItem: Item = {
            title: 'новая секция',
            pageId: pageId,
            type: type,
            orderNumber: sections.length + 1
        };

        await uploadSectionService(newItem, pageId);
    };

    const deleteSection = async (sectionId: string) => {
        const prevState = [...optimisticItems];

        setOptimisticItems((prevItems) => prevItems.filter(item => item.id !== sectionId));

        try {
            await deletSectionsAction(sectionId);

        } catch (error) {
            setOptimisticItems(prevState);
            console.error("Ошибка на сервере, откатываем изменения:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 items-center justify-center min-w-full bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Draggable List</h1>

            <Button onClick={ async () => addNewItem('секция') }>Добавить секцию</Button>

            <DragDropContext onDragEnd={ onDragEndAction } >
                <Droppable droppableId="0">
                    { (provided) => (
                        <div
                            ref={ provided.innerRef }
                            { ...provided.droppableProps }
                            className="w-full min-w-full bg-white shadow-md rounded-lg p-4"
                        >
                            { optimisticItems.map((item: Item, index) => (
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
                                                { item.id }
                                                <EditableContent contents={ item.content } sectionId={ item.id } />
                                            </div>
                                            <div className="flex items-center pl-4 border-l border-gray-600 cursor-grab text-gray-600 hover:text-gray-800">
                                                <button
                                                    onClick={ () => deleteSection(item.id) } // Вызов функции удаления
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
