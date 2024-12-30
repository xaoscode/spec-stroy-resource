import { ServiceComponentProps } from "./ServiceComponent.props";
import cn from "classnames";
import styles from "./ServiceComponent.module.css";
import Link from "next/link";

export default function ServiceComponent({
  header,
  className,
  link,
  ...props
}: ServiceComponentProps) {
  return (
    <div className={ cn(className, styles.component) } { ...props }>
      <div className={ styles.service__name }>
        <Link className="text-white text-xl  font-semibold hover:underline" href={ link }>
          { header }
        </Link>
      </div>

      {/* <Image */ }
      {/*   className={styles.image} */ }
      {/*   src={image} */ }
      {/*   alt={"image"} */ }
      {/*   width={200} */ }
      {/*   height={200} */ }
      {/* /> */ }
    </div>
  );
}
