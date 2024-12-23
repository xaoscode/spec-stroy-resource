'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Form {
    id: number;
    type: string;
}

export default function DynamicForms() {
    const [forms, setForms] = useState<Form[]>([]);
    const [formId, setFormId] = useState(1);

    // Добавление новой формы
    const addForm = (type: string) => {
        setForms((prev) => [...prev, { id: formId, type }]);
        setFormId((prev) => prev + 1);
    };

    // Удаление формы
    const removeForm = (id: number) => {
        setForms((prev) => prev.filter((form) => form.id !== id));
    };

    // Отправка формы
    const handleSubmit = async (id: number, type: string, data: any) => {
        try {
            await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, data }),
            });
            // Убираем форму после успешной отправки
            removeForm(id);
        } catch (error) {
            console.error('Ошибка отправки данных:', error);
        }
    };

    return (
        <div className='flex flex-col'>
            <DropdownMenu>
                <DropdownMenuTrigger className="outline outline-1 outline-offset-2 p-3 text-xl hover:bg-slate-500">
                    Добавить секцию
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={ () => addForm('text') }>Текст</DropdownMenuItem>
                    <DropdownMenuItem onClick={ () => addForm('list') }>Список</DropdownMenuItem>
                    <DropdownMenuItem onClick={ () => addForm('price') }>Цены</DropdownMenuItem>
                    <DropdownMenuItem onClick={ () => addForm('header') }>Заголовок</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            { forms.map((form) => (
                <div key={ form.id } className="form-block border p-4 my-4 rounded-lg">
                    <h3>Форма: { form.type }</h3>
                    <form
                        onSubmit={ (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const data = Object.fromEntries(formData.entries());
                            handleSubmit(form.id, form.type, data);
                        } }
                    >
                        <input
                            name="content"
                            placeholder={ `Введите данные для ${form.type}` }
                            className="input-field w-full p-2 border rounded mb-2"
                        />
                        <div className="flex gap-2">
                            <Button type="submit">Отправить</Button>
                            <Button type="button" variant="secondary" onClick={ () => removeForm(form.id) }>
                                Отмена
                            </Button>
                        </div>
                    </form>
                </div>
            )) }
        </div>
    );
}
