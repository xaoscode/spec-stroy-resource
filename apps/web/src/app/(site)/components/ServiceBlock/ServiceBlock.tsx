import { ServiceBlockProps } from "./ServiceBlock.props";
import cn from "classnames"
import styles from "./ServiceBlock.module.css"
export default function ServiceBlock({ children, className, ...props }: ServiceBlockProps) {
    return (
        <div className={ cn(className, styles.block) } { ...props }>
            { children }
        </div>
    )
}