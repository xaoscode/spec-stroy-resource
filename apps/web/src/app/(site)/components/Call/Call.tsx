"use client";
import { CallProps } from "./Call.props";
import cn from "classnames";
import styles from "./Call.module.css";
import CallForm from "@/components/CallForm/CallForm";

export default function Call({ className, ...props }: CallProps) {
  return (
    <div className={cn(className, styles.call)} {...props}>
      <CallForm></CallForm>
    </div>
  );
}
