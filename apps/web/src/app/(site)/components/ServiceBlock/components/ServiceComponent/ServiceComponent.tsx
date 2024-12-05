import { ServiceComponentProps } from "./ServiceComponent.props";
import cn from "classnames";
import styles from "./ServiceComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button/Button";
export default function ServiceComponent({
  image,
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

      <Image
        className={styles.image}
        src={image}
        title=""
        alt={"image"}
        width={200}
        height={200}
      />
      {/* <p className={styles.description}> */}
      {/*   Here is the image with a simplified survey setup in front of a building, */}
      {/*   featuring fewer objects for a clean and focused look. Let me know if you */}
      {/*   need further refinements! */}
      {/* </p> */}
    </div>
  );
}
