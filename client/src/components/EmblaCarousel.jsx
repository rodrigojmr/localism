import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import ImageFadeIn from 'react-image-fade-in';

const EmblaCarousel = ({ name, slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  const onSelect = useCallback(() => {
    if (!embla) return;
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <ImageFadeIn
                  alt={`${name} Image #${index + 1}`}
                  className="embla__slide__img"
                  src={slide}
                />
                {/* <img
                  className="embla__slide__img"
                  src={slide}
                  alt={`${name} Image #${index}`}
                /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
