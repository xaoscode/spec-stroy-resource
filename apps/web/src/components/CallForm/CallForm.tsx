"use client";
import cn from "classnames";
import { PhoneInp } from "../inputs/PhoneInput/PhoneInput";
import { CallFormProps } from "./CallForm.props";
import { Button } from "../Button/Button";
import { NewMessageAction } from "@/components/CallForm/lib/call-action";
import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { useActionState } from "react";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="text-lg mt-5"
      type="submit"
      variant="default"
      size="lg"
      aria-disabled={ pending }
    >
      Оставить заявку
    </Button>
  );
}

export default function CallForm({ setState, className, ...props }: CallFormProps) {
  const [state, formAction] = useActionState(NewMessageAction, initialState);
  return (
    <form
      action={ formAction }
      className={ cn("flex flex-col gap-4 items-center") }
      onSubmit={ () => setState && setState(false) }
      { ...props }
    >


      <div
        className={ cn(
          className,
          "gap-5"
        ) }
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium text-white">Имя</label>
          <Input id="name" name="name" className="rounded-none text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-medium text-white">Телефон</label>
          <PhoneInp name="phone" className="rounded-none text-black" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-white">Почта</label>
          <Input id="email" name="email" className="rounded-none text-black" />
        </div>
      </div>

      <SubmitButton />
      <p aria-live="polite" className="font-bold text-red-500" role="status">
        { state?.message }
      </p>
    </form>
  );
}
