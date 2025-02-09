"use client";
import cn from "classnames";
import { PhoneInp } from "../inputs/PhoneInput/PhoneInput";
import { CallFormProps } from "./CallForm.props";
import { Button } from "../Button/Button";
import { NewMessageAction } from "@/components/CallForm/lib/call-action";
import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const initialState = {
  message: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="text-lg"
      type="submit"
      variant="default"
      size="lg"
      aria-disabled={ pending }
    >
      Оставить заявку
    </Button>
  );
}

export default function CallForm({ className, ...props }: CallFormProps) {
  const [state, formAction] = useActionState(NewMessageAction, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Читаем состояние из localStorage при загрузке
  useEffect(() => {
    const storedTime = localStorage.getItem("formSubmittedAt");
    if (storedTime) {
      const elapsedTime = Date.now() - parseInt(storedTime, 10);
      if (elapsedTime < 60000) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 60000 - elapsedTime);
      }
    }
  }, []);

  useEffect(() => {
    if (state?.message === "Ваше обращение успешно создано") {
      setIsSubmitted(true);
      localStorage.setItem("formSubmittedAt", Date.now().toString());
      setTimeout(() => {
        setIsSubmitted(false);
        localStorage.removeItem("formSubmittedAt");
      }, 60000);
    }
  }, [state]);

  return (
    <form
      action={ formAction }
      className={ cn("flex flex-col") }
      { ...props }
    >

      { isSubmitted ? (
        <p className="font-bold text-3xl text-white text-center">
          Ваше обращение успешно отправлено!
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center px-5 gap-5">
          <div className="text-3xl text-center font-bold text-white ">
            Оставить заявку на консультацию
          </div>
          <div className={ cn(className, "gap-5") }>

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

          <div className="flex flex-row text-white items-center gap-3">
            <Checkbox id="terms" name="terms" />
            <Label htmlFor="terms" className="text-lg"> Даю согласие на обработку персональных данных</Label>
          </div>
          <SubmitButton />
          <p aria-live="polite" className="font-bold text-red-500" role="status">
            { state?.error }
          </p>
        </div>
      ) }


    </form>
  );
}
