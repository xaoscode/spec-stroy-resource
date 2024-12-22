
import { ReactNode } from "react";

export default async function ServicesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {


  return (
    <div className="grid grid-cols-1 gap-5">
      <div>{ children }</div>


    </div>
  );
}
