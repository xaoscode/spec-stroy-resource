"use server";

import Image from "next/image";
import { IContent } from "@repo/interfaces";

export async function ImageText({ initialContent }: { initialContent: IContent }) {
    return (
        <div>
            <h2 className="text-center mb-6">{ initialContent.header }</h2>

            <div className="flex flex-col lg:flex-row justify-between gap-6">
                { initialContent.block.map((block) => (
                    <div key={ block.id } className="flex-1 text-center space-y-3">
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <Image
                                width={ 1000 }
                                height={ 1000 }
                                src={ block.image }
                                alt={ `Изображение ${block.header}` }
                                className="rounded-md shadow max-w-full h-[400px] object-cover"
                                priority
                            />
                            <h3>{ block.header }</h3>
                            <p>{ block.text }</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}
