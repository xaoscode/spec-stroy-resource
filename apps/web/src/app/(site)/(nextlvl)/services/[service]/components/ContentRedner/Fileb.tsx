"use server";
import { FaFilePdf, FaFileWord, FaFileImage, FaFile } from 'react-icons/fa';
import { IContent } from "@repo/interfaces";
import Link from "next/link";
const FileIcon = ({ fileType }: { fileType: string }) => {
    switch (fileType) {
        case 'pdf':
            return <FaFilePdf className="text-red-500 text-4xl" />;
        case 'doc':
            return <FaFileWord className="text-blue-500 text-4xl" />;
        case 'docx':
            return <FaFileWord className="text-blue-500 text-4xl" />;
        case 'png':
        case 'jpg':
        case 'jpeg':
            return <FaFileImage className="text-green-500 text-4xl" />;
        default:
            return <FaFile className="text-gray-500 text-4xl" />
    }
};
export async function Fileb({ initialContent }: { initialContent: IContent }) {
    const baseUrl = "https://ssr-dv.ru";
    const newUrl = initialContent.image?.replace(/^.*(?=\/uploads)/, baseUrl) || baseUrl;
    return (
        <div>
            <h3>{ initialContent.header }</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700 sm:text-base md:text-lg">
                { initialContent.block.map((file) => (
                    <div
                        key={ file.id }
                        className="flex-shrink-0 w-64 h-32 border rounded-lg p-4 flex flex-col items-center justify-center bg-gray-100"
                    >
                        <FileIcon fileType={ file.image.split('.')[file.image.split('.').length - 1] } />
                        <Link
                            href={ newUrl }
                            target="_blank"
                            className="mt-2 text-blue-500 underline text-center"
                        >
                            { file.text }
                        </Link>
                    </div>
                )) }
            </div>

        </div>
    );
}
