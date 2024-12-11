import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Sidebar.module.css";
type SidebarProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      dsfasfdfasfsafsadf
    </div>
  );
}
