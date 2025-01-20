import styled from '@emotion/styled';
import { resetButtonStyle } from '../../styles/common';

export const Container = styled.section<{
  $slidesToShow: number;
  $slideWidth: number;
}>`
  position: relative;
  width: ${({ $slidesToShow, $slideWidth }) => `${$slidesToShow * $slideWidth}px`};

  &:hover button {
    opacity: 1;
  }
`;

export const ProgressBar = styled.div<{ $isTransitioning?: boolean }>`
  position: relative;
  width: 100%;
  height: 3px;
  background-color: #84868d;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: white;
    // 시간도 prop으로 뚫기
    animation: progress 4s linear;
    animation-play-state: ${({ $isTransitioning }) => ($isTransitioning ? 'paused' : 'running')};
  }

  @keyframes progress {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

export const ArrowWrapper = styled.button<{ $hasCustomArrow: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${resetButtonStyle};
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;

  &.left {
    left: 0;
    ${({ $hasCustomArrow }) =>
      !$hasCustomArrow &&
      `
      &::before {
        content: "←";
        font-size: 20px;
      }
    `}
  }

  &.right {
    right: 0;
    ${({ $hasCustomArrow }) =>
      !$hasCustomArrow &&
      `
      &::before {
        content: "→";
        font-size: 20px;
      }
    `}
  }
`;

export const UlWrapper = styled.div<{
  $slidesToShow: number;
  $slideWidth: number;
}>`
  overflow: hidden;
  width: ${({ $slidesToShow, $slideWidth }) => `${$slidesToShow * $slideWidth}px`};
`;

export const SlideUl = styled.ul<{
  $currentSlide: number;
  $isTransitioning: boolean;
  $slidesToShow: number;
  $slideWidth: number;
}>`
  display: flex;
  // transform, transition 작성
  transform: translateX(${({ $currentSlide, $slideWidth }) => `${-($currentSlide * $slideWidth)}px`});
  transition: ${({ $isTransitioning }) => ($isTransitioning ? 'transform 0.8s ease-in-out' : 'none')};

  & > * {
    flex-shrink: 0;
  }
`;
