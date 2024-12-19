import { ServiceComponentProps } from "./ServiceComponent.props";
import cn from "classnames";
import styles from "./ServiceComponent.module.css";
import Link from "next/link";
import { Button } from "@/components/Button/Button";
export default function ServiceComponent({
  header,
  className,
  ...props
}: ServiceComponentProps) {
  return (
    <div className={cn(className, styles.component)} {...props}>
      <div className={styles.service__name}>
        <Button variant="link" size="sm">
          <Link className={styles.link} href={"/"}>
            {header}
          </Link>
        </Button>
      </div>

      {/* <Image */}
      {/*   className={styles.image} */}
      {/*   src={image} */}
      {/*   alt={"image"} */}
      {/*   width={200} */}
      {/*   height={200} */}
      {/* /> */}
    </div>
  );
}
