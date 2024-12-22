'use client';

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        // Если строка поиска не пуста, добавляем параметр search
        if (term) {
            params.set('search', term);
        } else {
            // Если строка поиска пуста, удаляем параметр search
            params.delete('search');
        }

        // Заменяем URL с обновленными параметрами
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex flex-1 w-full">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full border border-black py-[9px] pl-10 text-xl outline-2 placeholder:text-black"
                placeholder={ placeholder }
                onChange={ (e) => {
                    handleSearch(e.target.value);
                } }
                defaultValue={ searchParams.get('search') || '' }
            />
            <SearchIcon className="absolute left-3 top-1/2 h-[23px] w-[23px] -translate-y-1/2 text-black peer-focus:text-gray-900" />
        </div>
    );
}
