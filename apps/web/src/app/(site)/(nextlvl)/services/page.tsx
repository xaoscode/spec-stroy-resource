import ServiceBlock from "@/components/ServiceBlock/ServiceBlock";
import { Metadata } from "next";
import allMetadata from "../lib/metadata";

export const metadata: Metadata = {
  ...allMetadata.services
};

export default async function Services() {
  return (
    <div className="grid grid-cols-1 gap-8 file:">
      <ServiceBlock />
    </div>
  );
}