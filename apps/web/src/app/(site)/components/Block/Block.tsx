import { BlockProps } from "./Block.props";
import cn from "classnames"
import styles from "./Block.module.css"
export default function Block({ className, ...props }: BlockProps) {
    return (
        <div className={ cn(className, styles.block) } { ...props }>

        </div>
    )
}