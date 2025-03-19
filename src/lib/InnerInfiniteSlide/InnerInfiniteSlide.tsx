import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IProps } from './InnerInfiniteSlide.types';
import '../style.css';

const InnerInfiniteSlide: React.FC<IProps> = ({
  slidesToScroll,
  children,
  leftArrow,
  rightArrow,
  auto = false,
  interval = 4,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  const slideRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = React.Children.toArray(children);
  const DATA = useMemo(() => {
    return [...slides.slice(-slidesToScroll), ...slides, ...slides.slice(0, slidesToScroll)];
  }, [slidesToScroll, slides]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (currentSlide !== slides.length && currentSlide + 2 * slidesToScroll > slides.length + slidesToScroll) {
      setCurrentSlide(slides.length);
    } else {
      setCurrentSlide((prev) => prev + slidesToScroll);
    }
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (currentSlide !== slidesToScroll && currentSlide - slidesToScroll < slidesToScroll) {
      setCurrentSlide(slidesToScroll);
    } else {
      setCurrentSlide((prev) => prev - slidesToScroll);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide >= slides.length + slidesToScroll) setCurrentSlide(slidesToScroll);
    if (currentSlide <= 0) setCurrentSlide(slides.length);
  };

  useLayoutEffect(() => {
    setCurrentSlide(slidesToScroll);
  }, [slidesToScroll]);

  useLayoutEffect(() => {
    if (!slideRef.current?.children[0]) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.target.getBoundingClientRect().width;
      setSlideWidth(width);
    });

    observer.observe(slideRef.current.children[0]);
    return () => observer.disconnect();
  }, []);

  // auto: true일 때
  useEffect(() => {
    if (auto && !isTransitioning) {
      timerRef.current = setTimeout(handleNextSlide, interval * 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [auto, isTransitioning, currentSlide, interval]);

  return (
    <section className="container">
      <button className={`arrow-wrapper left ${!leftArrow ? 'default' : ''}`} onClick={handlePrevSlide}>
        {leftArrow}
      </button>
      <div className="ul-wrapper" ref={containerRef}>
        {auto && (
          <div
            className={`progress-bar ${isTransitioning ? 'paused' : 'running'}`}
            key={currentSlide}
            style={
              {
                '--animation-duration': `${interval}s`,
              } as React.CSSProperties
            }
          />
        )}
        <ul
          className="slide-ul"
          ref={slideRef}
          style={{
            transform: `translateX(${-(currentSlide * slideWidth)}px)`,
            transition: isTransitioning ? 'transform 1s ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {DATA.map((slide, index) => (
            <li key={index}>{slide}</li>
          ))}
        </ul>
      </div>
      <button className={`arrow-wrapper right ${!rightArrow ? 'default' : ''}`} onClick={handleNextSlide}>
        {rightArrow}
      </button>
    </section>
  );
};

export default InnerInfiniteSlide;
