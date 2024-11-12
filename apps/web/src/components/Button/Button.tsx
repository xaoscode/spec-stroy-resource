import { ButtonProps } from "./Button.props";
import cn from "classnames"
import styles from "./Button.module.css"
import { ForwardedRef, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export const Button = forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            className={ cn(styles.button, styles[`${variant}`], styles[`${size}`], className) }
            ref={ ref }
            { ...props }
        />
    );
})

Button.displayName = "Button";

