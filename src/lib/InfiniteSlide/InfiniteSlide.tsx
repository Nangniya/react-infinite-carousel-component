import React, { useState } from 'react';
import { IProps } from './InfiniteSlide.types';
import * as S from './InfiniteSlide.styles';

const InfiniteSlide: React.FC<IProps> = ({ auto, children, leftArrow, rightArrow }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  return (
    <S.Container>
      <S.ArrowWrapper className="left" $hasCustomArrow={!!leftArrow}>
        {leftArrow}
      </S.ArrowWrapper>
      <S.UlWrapper>
        <S.SlideUl $currentSlide={currentSlide} $isTransitioning={isTransitioning}>
          {children}
        </S.SlideUl>
      </S.UlWrapper>
      <S.ArrowWrapper className="right" $hasCustomArrow={!!rightArrow}>
        {rightArrow}
      </S.ArrowWrapper>
    </S.Container>
  );
};

export default InfiniteSlide;
