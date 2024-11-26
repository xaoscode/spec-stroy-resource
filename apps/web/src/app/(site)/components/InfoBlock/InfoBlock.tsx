import { InfoBlockProps } from "./InfoBlock.props";
import cn from "classnames"
import styles from "./InfoBlock.module.css"
export default function InfoBlock({ className, ...props }: InfoBlockProps) {
    return (
        <div className={ cn(className, styles.block) } { ...props }>

        </div>
    )
}