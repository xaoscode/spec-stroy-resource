"use client";
import { Button } from "@/components/Button/Button";
import { Input, PhoneInp } from "@/components/inputs/PhoneInput/PhoneInput";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useState,
} from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { newMessage } from "../../api/Communication";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  text: string;
}
const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Кажется, такой почты не существует"),
  phone: z.string(),
});

export function DialogWin({
  text,
  variant = "default",
  size = "default",
}: DialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={variant} size={size}>
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent className=" bg-primary sm:max-w-[425px]">
          <DialogHeader className="">
            <DialogTitle className="text-center text-white text-2xl text-wrap">
              Заказать звонок
            </DialogTitle>
            <DialogDescription className="text-center text-white text-lg text-wrap font-light">
              Заполните форму и мы Вам позвоним
            </DialogDescription>
          </DialogHeader>
          <CommunicationForm setState={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={variant} size={size}>
          {text}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-primary">
        <DrawerHeader>
          <DrawerTitle className="text-center text-white  text-2xl text-wrap">
            Заказать звонок
          </DrawerTitle>
          <DrawerDescription className="text-center text-white text-lg text-wrap font-light">
            Заполните форму и мы Вам позвоним
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="text-white">
          <CommunicationForm setState={setOpen} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
interface CommunicationFormProps {
  setState: (state: boolean) => void;
}
function CommunicationForm({ setState }: CommunicationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    newMessage(values);
    setState(false);
  }
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name={"name"}
          render={function ({
            field,
          }: {
            field: ControllerRenderProps<FieldValues, string>;
          }): ReactElement {
            return (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name={"phone"}
          render={function ({
            field,
          }: {
            field: ControllerRenderProps<FieldValues, string>;
          }): ReactElement {
            return (
              <FormItem>
                <FormLabel>Номер</FormLabel>
                <FormControl>
                  <PhoneInp {...field}></PhoneInp>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name={"email"}
          render={function ({
            field,
          }: {
            field: ControllerRenderProps<FieldValues, string>;
          }): ReactElement {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
              </FormItem>
            );
          }}
        />

        <Button type="submit" variant="default" size="lg">
          Оставить заявку
        </Button>
      </form>
    </Form>
  );
}
