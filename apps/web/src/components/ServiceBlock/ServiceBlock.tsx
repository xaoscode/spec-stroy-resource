import { ServiceBlockProps } from "./ServiceBlock.props";
import cn from "classnames";
import styles from "./ServiceBlock.module.css";
import ServiceComponent from "./components/ServiceComponent/ServiceComponent";
export default function ServiceBlock({
  className,
  ...props
}: ServiceBlockProps) {
  return (
    <div className={cn(className, styles.block)} {...props}>
      <ServiceComponent
        header={"Строительно-техническая экспертиза жилья"}
        image={"/inspection.webp"}
      ></ServiceComponent>
      <ServiceComponent
        header={"Инструментально техническое обследование объектов"}
        image={"/instrumental.webp"}
      ></ServiceComponent>
      <ServiceComponent
        header={"BIM проектирование"}
        image={"/inspection.webp"}
      ></ServiceComponent>
      <ServiceComponent
        header={"Комплексное проектирование"}
        image={"/instrumental.webp"}
      ></ServiceComponent>{" "}
      <ServiceComponent
        header={"Проектирование инженерных систем и сетей"}
        image={"/instrumental.webp"}
      ></ServiceComponent>
    </div>
  );
}
