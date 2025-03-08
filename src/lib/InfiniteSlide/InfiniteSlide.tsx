import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IProps } from './InfiniteSlide.types';
import GlobalStyle from '../../styles/GlobalStyle';
import * as S from './InfiniteSlide.styles';

const InfiniteSlide: React.FC<IProps> = ({
  slidesToScroll = 1,
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
  const timerRef = useRef<NodeJS.Timeout>();

  const slides = React.Children.toArray(children);
  const DATA = [...slides.slice(-slidesToScroll), ...slides, ...slides.slice(0, slidesToScroll)];

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
  }, [auto, isTransitioning, currentSlide]);

  return (
    <>
      <GlobalStyle />
      <S.Container>
        <S.ArrowWrapper className="left" $hasCustomArrow={!!leftArrow} onClick={handlePrevSlide}>
          {leftArrow}
        </S.ArrowWrapper>
        <S.UlWrapper ref={containerRef}>
          {auto && <S.ProgressBar key={currentSlide} $isTransitioning={isTransitioning} $interval={interval} />}
          <S.SlideUl
            ref={slideRef}
            $currentSlide={currentSlide}
            $isTransitioning={isTransitioning}
            $slideWidth={slideWidth}
            onTransitionEnd={handleTransitionEnd}
          >
            {DATA}
          </S.SlideUl>
        </S.UlWrapper>
        <S.ArrowWrapper className="right" $hasCustomArrow={!!rightArrow} onClick={handleNextSlide}>
          {rightArrow}
        </S.ArrowWrapper>
      </S.Container>
    </>
  );
};

export default InfiniteSlide;
