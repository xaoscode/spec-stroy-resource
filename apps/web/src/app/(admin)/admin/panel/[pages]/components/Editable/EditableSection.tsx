"use client"
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { INewSection, ISection } from "@repo/interfaces";
import { EditableContent } from "./EditableContent";
import { addSectionAction, deleteAction, reorderAction } from "./_lib/content-service";
import { AdminButton } from "../../../components/AdminButton/AdminButton";


export function EditableSection({ sections = [], pageId = "" }: { sections?: ISection[], pageId?: string }) {
    const [optimisticItems, setOptimisticItems] = useState(sections);

    useEffect(() => {
        setOptimisticItems(sections)
    }, [sections])



    const onDragEndAction = async (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const sourceSectionId = optimisticItems[sourceIndex].id;
        const destinationPosition = optimisticItems[destinationIndex].index;
        await reorderAction(pageId, sourceSectionId, destinationPosition, "page", "section");
    };

    const addNewItem = async (type: string) => {
        const newItem: INewSection = {
            title: 'новая секция',
            pageId: pageId,
            type: type,
            index: sections.length + 1
        };

        await addSectionAction(newItem, pageId);
    };

    const deleteSection = async (sectionId: string) => {
        const prevState = [...optimisticItems];

        setOptimisticItems((prevItems) => prevItems.filter(item => item.id !== sectionId));

        try {
            await deleteAction(sectionId, "section", "page", pageId);

        } catch (error) {
            setOptimisticItems(prevState);
            console.error("Ошибка на сервере, откатываем изменения:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5  min-w-full">

            <AdminButton className="w-[300px]" variant="save" onClick={ async () => addNewItem('секция') }>Добавить секцию</AdminButton>

            <DragDropContext onDragEnd={ onDragEndAction } >
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
                                            className={ `flex items-center p-4 mb-2 bg-gray-200 rounded-lg shadow-sm ${snapshot.isDragging ? "bg-green-300" : ""}` }
                                        >
                                            <div
                                                { ...provided.dragHandleProps }
                                                className="flex items-center pr-4  border-gray-600 cursor-grab text-gray-600 hover:text-gray-800"
                                            >
                                                <GripVertical />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-row justify-between">
                                                    <h1>Секция: { item.index }</h1>
                                                    <AdminButton
                                                        onClick={ () => deleteSection(item.id) }
                                                        variant="remove"
                                                    >
                                                        Удалить секцию
                                                    </AdminButton>
                                                </div>
                                                <EditableContent contents={ item.content } sectionId={ item.id } pageId={ pageId } />
                                                <p className="text-sm text-gray-500">id: { item.id }</p>
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
