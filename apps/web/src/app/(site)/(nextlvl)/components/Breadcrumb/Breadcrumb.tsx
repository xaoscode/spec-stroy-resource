"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./components/Breadcrumb.components";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { Button } from "@/components/Button/Button";
import styles from "./Breadcrumb.module.css";
import Image from "next/image";
import { breadcrumbTranslations } from "./lib/breadcrumbTranslations";
import cyrillicToTranslit from "cyrillic-to-translit-js";

export function BreadcrumbModule() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part);
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className={styles.navigation__component}>
      <Breadcrumb className={styles.breadcrumb}>
        <BreadcrumbList className={styles.list}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/"}>Главная</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;
            const href = "/" + pathParts.slice(0, index + 1).join("/");
            const name =
              breadcrumbTranslations[part] ||
              cyrillicToTranslit().reverse(part).split("-").join(" ");
            return (
              <Fragment key={index}>
                {isLast ? (
                  <BreadcrumbItem>
                    <span>{name}</span>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={href}>{name}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        onClick={handleBackClick}
        variant="outline"
        size="sm"
        className={styles.butt}
      >
        <Image src={"/arrowleft.svg"} alt={""} width={30} height={30} />
        <span>Вернуться назад</span>
      </Button>
    </div>
  );
}
