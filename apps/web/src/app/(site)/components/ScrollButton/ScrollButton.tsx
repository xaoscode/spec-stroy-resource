"use client"
import { MoveUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div>
            { isVisible && (
                <button
                    onClick={ scrollToTop }
                    className="fixed bottom-5 right-5 p-4 py-7 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                    aria-label="Наверх"
                >
                    <MoveUp />
                </button>
            ) }
        </div>
    );
};

export default ScrollButton;