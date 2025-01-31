import React from "react";
import styles from "./OurProjects.components.module.css";
import Image from "next/image";

type PropType = {
  selected: boolean;
  index: number;
  image: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hover: boolean;
};

export const Thumb: React.FC<PropType> = ({
  onMouseEnter,
  image,
  selected,
  onClick,
}) => {
  return (
    <div
      onMouseEnter={ onMouseEnter }
      className={ `${styles.emblaThumbsSlide} ${selected ? styles.emblaThumbsSlideSelected : ""
        }` }
    >
      <button
        onClick={ onClick }
        type="button"
        className={ styles.emblaThumbsSlideNumber }
      >
        <Image
          className={ styles.image }
          src={ image }
          alt={ "" }
          width={ 300 }
          height={ 300 }
        />
      </button>
    </div>
  );
};
