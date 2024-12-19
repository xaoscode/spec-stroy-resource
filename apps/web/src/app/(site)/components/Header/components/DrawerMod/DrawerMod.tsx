import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { urls } from "../../../lib/urls";
import Link from "next/link";
import { Menu } from "lucide-react";

export function DraweMod() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Menu size={35} className="text-white p-0 m-0" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-black tracking-wider text-xl">
            Меню
          </DrawerTitle>
          <ul className="flex flex-col justify-center gap-3">
            {urls.map((value, i) => (
              <li key={i} className="text-primary text-xl tracking-widest">
                <DrawerClose asChild>
                  <Link href={value.url}>{value.name}</Link>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
