"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import styles from "./Breadcrumb.module.css";
import { breadcrumbTranslations } from "./lib/breadcrumbTranslations";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MoveLeft } from "lucide-react";

export function BreadcrumbModule() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className={ styles.navigation__component }>
      <Breadcrumb className={ styles.breadcrumb }>
        <BreadcrumbList className={ styles.list }>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={ "/" }>Главная</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          { pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;
            const href = "/" + pathParts.slice(0, index + 1).join("/");
            const name =
              breadcrumbTranslations[part] || part
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
        className="flex flex-row gap-3 text-xl items-center text-white font-normal hover:text-black hover:no-underline"
      >
        <MoveLeft />
        <span >Назад</span>
      </button>
    </div>
  );
}
