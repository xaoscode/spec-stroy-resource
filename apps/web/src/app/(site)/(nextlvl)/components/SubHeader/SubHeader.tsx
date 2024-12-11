import { SubHeaderProps } from "./SubHeader.props";
import cn from "classnames";
import styles from "./SubHeader.module.css";
import { BreadcrumbModule } from "../Breadcrumb/Breadcrumb";
export default function SubHeader({ className, ...props }: SubHeaderProps) {
  return (
    <div className={cn(className, styles.header)} {...props}>
      <div className={styles.main}>
        <BreadcrumbModule />
      </div>
    </div>
  );
}
