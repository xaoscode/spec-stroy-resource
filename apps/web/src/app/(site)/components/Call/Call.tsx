"use client";
import { CallProps } from "./Call.props";
import cn from "classnames";
import styles from "./Call.module.css";
import CallForm from "@/components/CallForm/CallForm";

export default function Call({ className, ...props }: CallProps) {
  return (
    <div className={ cn(className, styles.call) } { ...props }>
      <div className="text-3xl text-center font-bold text-white">
        Воспользуйтесь консультацией от специалиста
      </div>
      <CallForm className="flex flex-col lg:flex-row lg:gap-5 w-full" />
    </div>
  );
}
