import cn from "classnames";
import styles from "./PhoneInput.module.css";
import { ForwardedRef, forwardRef } from "react";
import {
  PhoneInput,
  PhoneInputProps,
  PhoneInputRefType,
} from "react-international-phone";
import { InputProps } from "./Input.props";

export const PhoneInp = forwardRef(
  (
    { className, ...props }: PhoneInputProps,
    ref: ForwardedRef<PhoneInputRefType>,
  ) => {
    return (
      <PhoneInput
        defaultCountry="ru"
        hideDropdown={ true }
        disableCountryGuess={ true }
        forceDialCode={ true }
        inputClassName={ cn(className, "flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-lg dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",) }
        countrySelectorStyleProps={ {
          className: styles.selector,
        } }
        { ...props }
        ref={ ref }
      />
    );
  },
);

PhoneInp.displayName = "PhoneInp";

export const Input = forwardRef(
  (
    { className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        className={ cn(className, styles.phone__input) }
        { ...props }
        ref={ ref }
      />
    );
  },
);

Input.displayName = "Input";
