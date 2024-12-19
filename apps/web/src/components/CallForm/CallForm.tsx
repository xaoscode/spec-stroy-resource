"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import { ReactElement } from "react";
import { z } from "zod";
import { Input, PhoneInp } from "../inputs/PhoneInput/PhoneInput";
import styles from "./CallForm.module.css";
import { CallFormProps } from "./CallForm.props";
import { newMessage } from "@/app/(site)/api/Communication";
import { useForm, ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, Form } from "../ui/form";
import { Button } from "../Button/Button";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Кажется, такой почты не существует"),
  phone: z.string(),
});

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(styles.form, className)}
        {...props}
      >
        <div className={styles.header__text}>
          Воспользуйтесь консультацией от специалиста
        </div>
        <div className={styles.inputs}>
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
        </div>

        <Button type="submit" variant="default" size="lg">
          Оставить заявку
        </Button>
      </form>
    </Form>
  );
}
