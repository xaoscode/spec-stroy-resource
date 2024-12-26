'use client';

import { Button } from "@/components/ui/button";
import EditableSection from '../Editable/EditableSection';
import { usePageContext } from "../context/Page.context";

export default function DynamicPage() {
    const { page, addSection } = usePageContext();

    const handleSave = async () => {
        try {
            await fetch('/api/save-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(page),
            });
            alert('Изменения сохранены.');
        } catch (error) {
            console.error('Ошибка сохранения:', error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1>{ page.title }</h1>
            <p>{ page.description }</p>

            { page.sections?.map((section, i) => (
                <EditableSection
                    key={ i }
                    section={ section }
                />
            )) }

            <Button variant="outline" onClick={ addSection }>
                Добавить секцию
            </Button>

            <Button variant="outline" onClick={ handleSave } className="mt-4">
                Сохранить изменения
            </Button>
        </div>
    );
}
