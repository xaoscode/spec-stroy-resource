import { OurProjects } from "@/components/OurProjects/OurProjects";
import { ReactNode } from "react";

export default async function ServicesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <div className="grid grid-cols-1 gap-5">
      <div>{ children }</div>

      <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md place-items-center">
        <div
          className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary
"
        >
          Примеры
        </div>
        <OurProjects />
      </div>
    </div>
  );
}
