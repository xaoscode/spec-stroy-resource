'use client';

import { useActionState } from "react";
import { AdminButton } from "../../panel/components/AdminButton/AdminButton";
import { ArrowRightIcon, MessageCircleWarningIcon } from "lucide-react";
import { authenticate } from "../lib/actions";



export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={ formAction } className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={ `mb-3 text-2xl` }>
                    Авторизуйтесь для продолжения
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                name="email"
                                placeholder="Введите ваш email"
                                required
                            />

                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Введите пароль"
                                required
                                minLength={ 6 }
                            />

                        </div>
                    </div>
                </div>
                <AdminButton className="mt-4 w-full" aria-disabled={ isPending }>
                    Войти <ArrowRightIcon className="ml-auto h-5 w-5 text-black" />
                </AdminButton>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    { errorMessage && (
                        <>
                            <MessageCircleWarningIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{ errorMessage }</p>
                        </>
                    ) }
                </div>
            </div>
        </form>
    );
}