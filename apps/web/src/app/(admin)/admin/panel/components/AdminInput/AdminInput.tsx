import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "classnames"
const inputVariants = cva(
    "w-full rounded-md border focus:outline-none focus:ring-2 transition-shadow disabled:opacity-50",
    {
        variants: {
            inputSize: {
                small: "text-xl px-2 py-1 font-medium",
                medium: "text-2xl px-3 py-2 font-semibold",
                large: "text-3xl px-4 py-3 text-center font-bold",
            },
            variant: {
                default: "border-gray-300 focus:ring-blue-500",
                error: "border-red-500 focus:ring-red-500",
                success: "border-green-500 focus:ring-green-500",
            },
        },
        defaultVariants: {
            inputSize: "medium",
            variant: "default",
        },
    }
);

export interface AdminInputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    asChild?: boolean;
}

const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
    ({ className, inputSize, variant, ...props }, ref) => {
        return (
            <input
                className={ cn(inputVariants({ inputSize, variant, className })) }
                ref={ ref }
                { ...props }
            />
        );
    }
);

AdminInput.displayName = "AdminInput";

export { AdminInput, inputVariants };
