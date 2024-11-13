import { ServiceComponentProps } from "./ServiceComponent.props";
import cn from "classnames"
import styles from "./ServiceComponent.module.css"
import Image from "next/image"
export default function ServiceComponent({ image, header, className, ...props }: ServiceComponentProps) {
    return (
        <div className={ cn(className, styles.component) } { ...props }>
            <div className={ styles.image__block }>
                <div className={ styles.header }>
                    <h3 className={ styles.header__text }>{ header }</h3>
                </div>

                <Image className={ styles.image } src={ image } title="" alt={ "image" } width={ 350 } height={ 350 }></Image>
            </div>
            <div className={ styles.text__block }>
                <p className={ styles.description }>
                    Here is the image with a simplified survey setup in front of a building, featuring fewer objects for a clean and focused look. Let me know if you need further refinements!
                </p>
            </div>

        </div>
    )
}