import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ServiceBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
}
