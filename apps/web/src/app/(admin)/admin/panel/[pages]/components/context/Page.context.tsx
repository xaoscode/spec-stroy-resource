'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IPage, ISection, IContent } from '@repo/interfaces';

interface PageContextType {
    page: IPage;
    setPage: React.Dispatch<React.SetStateAction<IPage>>;
    addSection: () => void;
    updateSection: (updatedSection: ISection) => void;
    removeSection: (id?: string) => void;
    addContent: (sectionId: string) => void;
    updateContent: (sectionId: string, updatedContent: IContent) => void;
    removeContent: (sectionId: string, contentId?: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePageContext must be used within a PageProvider');
    }
    return context;
};

interface PageProviderProps {
    children: ReactNode;
    initialPageData: IPage;
}

export const PageProvider = ({ children, initialPageData }: PageProviderProps) => {
    const [page, setPage] = useState<IPage>(initialPageData);


    console.log(page)

    const addSection = () => {
        const newSection: ISection = {
            title: `Новая секция`,
            orderNumber: (page.sections?.length || 0) + 1,
            type: 'text',
            pageId: page.id || '',
            content: [],
        };

        setPage((prev) => ({
            ...prev,
            sections: [...(prev.sections || []), newSection],
        }));
    };

    const updateSection = (updatedSection: ISection) => {
        setPage((prev) => ({
            ...prev,
            sections: prev.sections?.map((section) =>
                section.id === updatedSection.id ? updatedSection : section
            ),
        }));
    };

    const removeSection = (id?: string) => {
        setPage((prev) => ({
            ...prev,
            sections: prev.sections?.filter((section) => section.id !== id),
        }));
    };

    const addContent = (sectionId: string) => {
        const newContent: IContent = {
            contentType: 'text',
            contentText: '',
            sectionId,
        };
        setPage((prev) => ({
            ...prev,
            sections: prev.sections?.map((section) =>
                section.id === sectionId
                    ? { ...section, content: [...(section.content || []), newContent] }
                    : section
            ),
        }));
    };

    const updateContent = (sectionId: string, updatedContent: IContent) => {
        setPage((prev) => ({
            ...prev,
            sections: prev.sections?.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        content: section.content?.map((content) =>
                            content.id === updatedContent.id ? updatedContent : content
                        ),
                    }
                    : section
            ),
        }));
    };

    const removeContent = (sectionId: string, contentId?: string) => {
        setPage((prev) => ({
            ...prev,
            sections: prev.sections?.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        content: section.content?.filter((content) => content.id !== contentId),
                    }
                    : section
            ),
        }));
    };



    return (
        <PageContext.Provider
            value={ {
                page,
                setPage,
                addSection,
                updateSection,
                removeSection,
                addContent,
                updateContent,
                removeContent,
            } }
        >
            { children }
        </PageContext.Provider>
    );
};
