import { ServiceBlockProps } from "./ServiceBlock.props";
import cn from "classnames";
import { services } from "@/app/(site)/(nextlvl)/lib/services.urls";
import Link from "next/link";

export default function ServiceBlock({
  className,
  ...props
}: ServiceBlockProps) {
  return (
    <div
      className={ cn(
        "flex space-x-5 justify-between",
        className
      ) }
      { ...props }
    >
      { services.map((service, index) => (
        <div
          key={ index }
          className="bg-primary border shadow-md hover:shadow-lg transition-shadow duration-300 flex-none h-64 w-64 flex items-center justify-center p-3"
        >
          <Link
            href={ service.url }
            className="text-white text-xl font-semibold hover:underline text-center"
          >
            { service.header }
          </Link>
        </div>
      )) }
    </div>
  );
}
