"use server";

import { IContent } from "@repo/interfaces";
import Link from "next/link";

export async function Fileb({ initialContent }: { initialContent: IContent }) {
    return (
        <div>
            <h3>{ initialContent.header }</h3>
            <div className="text-sm list-disc pl-6 text-gray-700 sm:text-base md:text-lg">
                { initialContent.block.map((value) => (
                    <div key={ value.id } className="mb-4">
                        { value.image && (
                            <div>
                                <Link
                                    href={ `${value.image}` }
                                    target="_blank"
                                    className="text-blue-500 underline"
                                >
                                    Скачать файл: { value.image }
                                </Link>
                            </div>
                        ) }
                    </div>
                )) }
            </div>
        </div>
    );
}
