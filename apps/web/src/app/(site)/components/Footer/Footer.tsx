import { FooterProps } from "./Footer.props";
import cn from "classnames";
import styles from "./Footer.module.css";
import { ContactData } from "@/components/ContactData/ContactData";
export default function Footer({ className, ...props }: FooterProps) {
  return (
    <div className={cn(className, styles.footer)} {...props}>
      <ContactData />
    </div>
  );
}

