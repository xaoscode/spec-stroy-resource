import { Search } from "lucide-react";
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames";
interface InputWithIconProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  placeholder: string;
}
const InputWithIcon = ({
  className,
  placeholder,
  ...props
}: InputWithIconProps) => {
  return (
    <div
      className={cn("flex items-center border border-black", className)}
      {...props}
    >
      <label className="p-2 text-black" htmlFor="input">
        <Search />
      </label>
      <input
        id="input"
        type="text"
        placeholder={placeholder}
        className="flex-1 p-2 border-0 focus:outline-none focus:ring-0 placeholder-black text-lg font-medium"
      />
    </div>
  );
};

export default InputWithIcon;
