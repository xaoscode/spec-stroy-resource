'use client';

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { Input } from "../ui/input";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex w-full">
            <Input
                className="focus-visible:outline-none focus-visible:border-transparent block border border-black py-1 px-10 text-xl placeholder:text-black rounded-none h-full"
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
