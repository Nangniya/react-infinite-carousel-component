import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IProps } from './InfiniteSlide.types';
import * as S from './InfiniteSlide.styles';
import GlobalStyle from '../../styles/GlobalStyle';

const InfiniteSlide: React.FC<IProps> = ({
  auto = false,
  slidesToShow = 3,
  slidesToScroll = 2,
  children,
  leftArrow,
  rightArrow,
  gap = 0,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  const slides = React.Children.toArray(children);
  const slideRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<number>();

  const DATA = [...slides.slice(-slidesToShow), ...slides, ...slides.slice(0, slidesToScroll)];

  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + (direction === 'next' ? slidesToScroll : -slidesToScroll));
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentSlide >= slides.length + slidesToShow) setCurrentSlide(slidesToShow);
    if (currentSlide <= 0) setCurrentSlide(slides.length);
  };

  useLayoutEffect(() => {
    setCurrentSlide(slidesToShow);
  }, [slidesToShow]);

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
      timerRef.current = setTimeout(() => {
        handleSlideChange('next');
      }, 4000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [auto, isTransitioning, currentSlide]);

  return (
    <>
      <GlobalStyle />
      <S.Container $slideWidth={slideWidth} $slidesToShow={slidesToShow}>
        <S.ArrowWrapper className="left" $hasCustomArrow={!!leftArrow} onClick={() => handleSlideChange('prev')}>
          {leftArrow}
        </S.ArrowWrapper>
        <S.UlWrapper $slideWidth={slideWidth} $slidesToShow={slidesToShow}>
          {auto && <S.ProgressBar key={currentSlide} $isTransitioning={isTransitioning} />}
          <S.SlideUl
            ref={slideRef}
            $currentSlide={currentSlide}
            $isTransitioning={isTransitioning}
            $slidesToShow={slidesToShow}
            $slideWidth={slideWidth}
            onTransitionEnd={handleTransitionEnd}
          >
            {DATA}
          </S.SlideUl>
        </S.UlWrapper>
        <S.ArrowWrapper className="right" $hasCustomArrow={!!rightArrow} onClick={() => handleSlideChange('next')}>
          {rightArrow}
        </S.ArrowWrapper>
      </S.Container>
    </>
  );
};

export default InfiniteSlide;
