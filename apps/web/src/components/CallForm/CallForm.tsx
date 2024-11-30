"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import { ReactElement } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { Button } from "../Button/Button";
import { Input, PhoneInp } from "../inputs/PhoneInput/PhoneInput";
import styles from "./CallForm.module.css";
import { CallFormProps } from "./CallForm.props";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./components/CallFromComponents";
import { newMessage } from "@/app/(site)/api/Communication";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Кажется, такой почты не существует"),
  phone: z.string(),
});
export function ContactForm() {}

export default function CallForm({ className, ...props }: CallFormProps) {
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
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(styles.form, className)}
        {...props}
      >
        <h2 className={styles.header__text}>
          Воспользуйтесь консультацией от специалиста
        </h2>
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
        <Button type="submit" size="lg">
          Оставить заявку
        </Button>
      </form>
    </FormProvider>
  );
}
