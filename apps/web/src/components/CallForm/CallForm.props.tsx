import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CallFormProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> {
  setState?: (state: boolean) => void;
}
