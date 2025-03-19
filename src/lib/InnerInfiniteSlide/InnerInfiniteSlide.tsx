import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IProps } from './InnerInfiniteSlide.types';
import * as styles from './InnerInfiniteSlide.css';

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
    <section className={styles.container}>
      <button className={`${styles.leftArrow} ${!leftArrow && styles.defaultLeftArrow}`} onClick={handlePrevSlide}>
        {leftArrow}
      </button>
      <div className={styles.ulWrapper} ref={containerRef}>
        {auto && (
          <div
            className={`${styles.progressBar} ${isTransitioning ? styles.paused : styles.running}`}
            key={currentSlide}
            style={{ animationDuration: `${interval}s` }}
          />
        )}
        <ul
          className={`${styles.slideUl} ${isTransitioning ? styles.transitioning : styles.transitionNone}`}
          ref={slideRef}
          style={{
            transform: `translateX(${-(currentSlide * slideWidth)}px)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {DATA.map((slide, index) => (
            <li key={index} className={styles.slideLi}>
              {slide}
            </li>
          ))}
        </ul>
      </div>
      <button className={`${styles.rightArrow} ${!rightArrow && styles.defaultRightArrow}`} onClick={handleNextSlide}>
        {rightArrow}
      </button>
    </section>
  );
};

export default InnerInfiniteSlide;
