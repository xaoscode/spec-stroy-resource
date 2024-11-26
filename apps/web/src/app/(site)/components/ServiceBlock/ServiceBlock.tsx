import { ServiceBlockProps } from "./ServiceBlock.props";
import cn from "classnames"
import styles from "./ServiceBlock.module.css"
export default function ServiceBlock({ children, className, ...props }: ServiceBlockProps) {
    return (
        <div className={ styles.block__wrapper }>
            <h2 className={ styles.header }>УСЛУГИ</h2>
            <div className={ cn(className, styles.block) } { ...props }>
                { children }
            </div>
        </div>

    )
}