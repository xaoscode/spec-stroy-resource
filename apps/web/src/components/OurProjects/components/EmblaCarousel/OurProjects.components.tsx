"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import styles from "./OurProjects.components.module.css";
import Image from "next/image";
import { IImage } from "@repo/interfaces";

type PropType = {
  slides: IImage[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);


  return (
    <div className={ styles.embla }>
      <div className={ styles.embla__viewport } ref={ emblaMainRef }>
        <div className={ styles.embla__container }>
          { slides.map((index, key) => (
            <div className={ styles.embla__slide } key={ key }>
              <div className={ styles.embla__slide__number }>
                <Image
                  className={ styles.image }
                  src={ index.url }
                  alt={ `Изображение проекта ${index.name}` }
                  width={ 1000 }
                  height={ 1000 }
                  priority
                />
              </div>
            </div>
          )) }
        </div>
      </div>

      { slides.length > 1 && <div className={ styles.embla_thumbs }>
        <div className={ styles.embla_thumbs__viewport } ref={ emblaThumbsRef }>
          <div className={ styles.embla_thumbs__container }>
            { slides.map((index, element) => (
              <Thumb
                key={ element }
                onClick={ () => onThumbClick(element) }
                onMouseEnter={ () => onThumbClick(element) }
                onMouseLeave={ () => setHoverIndex(null) }
                selected={ element === selectedIndex }
                hover={ element === hoverIndex }
                index={ element }
                image={ index.url }
              />
            )) }
          </div>
        </div>
      </div> }
    </div>
  );
};

export default EmblaCarousel;
