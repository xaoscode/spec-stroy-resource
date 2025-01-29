"use server";

import { IContent } from "@repo/interfaces";


export async function PriceList({ initialContent }: { initialContent: IContent }) {

    return (
        <div>
            <h3 className="text-center mb-6">
                { initialContent.header }
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                { initialContent.block.map((item, index) => (
                    <div
                        key={ index }
                        className="p-4 border rounded-md shadow-sm bg-white flex flex-col items-center space-y-2 justify-between"
                    >
                        <h4 className="text-2xl font-bold text-primary text-center">{ item.header }</h4>
                        <div className="text-center">
                            <p className="text-green-500 font-semibold text-5xl">
                                { item.text } ₽
                            </p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}
