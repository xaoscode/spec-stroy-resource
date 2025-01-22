"use server";

import Image from "next/image";
import { IContent } from "@repo/interfaces";
import cn from 'classnames'
export async function ImageText({ initialContent }: { initialContent: IContent }) {
    const isSingleBlock = initialContent.block.length === 1;

    return (
        <div>
            <h2 className="text-center mb-6">{ initialContent.header }</h2>

            <div
                className={ `flex ${isSingleBlock ? "flex-col lg:flex-row gap-6" : "flex-wrap justify-between gap-6"
                    }` }
            >
                { initialContent.block.map((block) => (
                    <div
                        key={ block.id }
                        className={ cn(isSingleBlock ? "flex lg:flex-row gap-5 flex-col" : "flex flex-col text-center items-center", "flex-1 min-w-[300px]",) }
                    >
                        <Image
                            width={ 1000 }
                            height={ 1000 }
                            src={ block.image }
                            alt={ `Изображение ${block.header}` }
                            className="rounded-md shadow max-w-full h-[400px] object-cover"
                            priority
                        />
                        <div className="mt-3 space-y-2">
                            <h3>{ block.header }</h3>
                            <p>{ block.text }</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}
