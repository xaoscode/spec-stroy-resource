import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ServiceComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	header: string;
	image: string;
}
