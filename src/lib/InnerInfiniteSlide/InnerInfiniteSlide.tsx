import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IProps } from '../InfiniteSlide/InfiniteSlide.types';
import * as styles from './InnerInfiniteSlide.css';

const InnerInfiniteSlide: React.FC<Required<IProps>> = ({
  slidesToScroll,
  children,
  leftArrow,
  rightArrow,
  auto,
  interval,
  arrowsOverlay,
  arrowsAlwaysVisible,
  gap,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [arrowWidths, setArrowWidths] = useState({ left: 0, right: 0 });

  const slideRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
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

  // 화살표 너비 측정
  useLayoutEffect(() => {
    if (!arrowsOverlay && leftArrowRef.current && rightArrowRef.current) {
      const leftWidth = leftArrowRef.current.offsetWidth;
      const rightWidth = rightArrowRef.current.offsetWidth;
      setArrowWidths({ left: leftWidth, right: rightWidth });
    }
  }, [arrowsOverlay, leftArrow, rightArrow]);

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

  const containerStyle = !arrowsOverlay
    ? {
        paddingLeft: `${arrowWidths.left}px`,
        paddingRight: `${arrowWidths.right}px`,
      }
    : {};

  return (
    <section className={styles.container} style={containerStyle}>
      <button
        ref={leftArrowRef}
        className={`${arrowsAlwaysVisible ? styles.arrowVisible : styles.arrowHover} ${styles.leftArrow} ${!leftArrow && styles.defaultLeftArrow}`}
        onClick={handlePrevSlide}
      >
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
            transform: `translateX(${-(currentSlide * (slideWidth + gap))}px)`,
            gap: `${gap}px`,
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
      <button
        ref={rightArrowRef}
        className={`${arrowsAlwaysVisible ? styles.arrowVisible : styles.arrowHover} ${styles.rightArrow} ${!rightArrow && styles.defaultRightArrow}`}
        onClick={handleNextSlide}
      >
        {rightArrow}
      </button>
    </section>
  );
};

export default InnerInfiniteSlide;
