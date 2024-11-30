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
        hideDropdown={true}
        disableCountryGuess={true}
        forceDialCode={true}
        inputClassName={cn(className, styles.phone__input)}
        countrySelectorStyleProps={{
          className: styles.selector,
        }}
        {...props}
        ref={ref}
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
        className={cn(className, styles.phone__input)}
        {...props}
        ref={ref}
      />
    );
  },
);

Input.displayName = "Input";
