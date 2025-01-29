"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { breadcrumbTranslations, headers } from "../../lib/breadcrumbTranslations";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MoveLeft } from "lucide-react";
import cn from "classnames";

export function BreadcrumbModule() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="flex lg:flex-row  gap-4 flex-col">
        <Breadcrumb className="flex-grow">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Главная</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            { pathParts.map((part, index) => {
              const isLast = index === pathParts.length - 1;
              const href = "/" + pathParts.slice(0, index + 1).join("/");
              const name = breadcrumbTranslations[part] || part;
              return (
                <Fragment key={ index }>
                  { isLast ? (
                    <BreadcrumbItem>
                      <span>{ name }</span>
                    </BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href={ href }>{ name }</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  ) }
                </Fragment>
              );
            }) }
          </BreadcrumbList>
        </Breadcrumb>

        <button
          onClick={ handleBackClick }
          className={ cn(
            "flex items-center gap-3 text-xl text-white font-normal hover:text-black",
            "self-end "
          ) }
        >
          <MoveLeft />
          <span>Назад</span>
        </button>

      </div>
      <h1 className="text-white">{ headers[pathParts[pathParts.length - 1]] }</h1>

    </div>

  );
}
