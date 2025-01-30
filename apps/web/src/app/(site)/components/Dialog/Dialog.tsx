"use client";
import { Button } from "@/components/Button/Button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  DetailedHTMLProps,
  HTMLAttributes,

  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CallForm from "@/components/CallForm/CallForm";

interface DialogProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "filled"
  | "ghost"
  | "link";
  size?: "default" | "sm" | "lg" | "icon";
  text?: string;
}


export function DialogWin({
  text,
  variant = "default",
  size = "default",
}: DialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={ open } onOpenChange={ setOpen }>
        <DialogTrigger asChild>
          <Button variant={ variant } size={ size }>
            { text }
          </Button>
        </DialogTrigger>
        <DialogContent className=" bg-primary sm:max-w-[425px]">
          <DialogHeader className="">
            <DialogTitle className="text-center text-white text-2xl text-wrap">

            </DialogTitle>
            <DialogDescription className="text-center text-white text-lg text-wrap font-light">

            </DialogDescription>
          </DialogHeader>
          <CallForm className="grid grid-cols-1 gap-6 w-full" />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={ open } onOpenChange={ setOpen }>
      <DrawerTrigger asChild>
        <Button variant={ variant } size={ size }>
          { text }
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-primary">
        <DrawerHeader>
          <DrawerTitle className="text-center text-white  text-2xl text-wrap">

          </DrawerTitle>
          <DrawerDescription className="text-center text-white text-lg text-wrap font-light">

          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="text-white">
          <CallForm className="grid grid-cols-1 gap-6 w-full" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}


