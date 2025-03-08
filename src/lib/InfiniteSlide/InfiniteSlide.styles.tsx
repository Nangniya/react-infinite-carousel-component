import styled from '@emotion/styled';
import { resetButtonStyle } from '../../styles/common';

export const Container = styled.section`
  position: relative;
  width: 100%;

  &:hover button {
    opacity: 1;
  }
`;

export const ProgressBar = styled.div<{ $isTransitioning: boolean; $interval: number }>`
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
    animation: ${({ $interval }) => `progress ${$interval}s linear`};
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

export const UlWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const SlideUl = styled.ul<{
  $currentSlide: number;
  $isTransitioning: boolean;
  $slideWidth: number;
}>`
  display: flex;
  // transform, transition 작성
  transform: translateX(${({ $currentSlide, $slideWidth }) => `${-($currentSlide * $slideWidth)}px`});
  transition: ${({ $isTransitioning }) => ($isTransitioning ? 'transform 1s ease-in-out' : 'none')};

  & > * {
    flex-shrink: 0;
  }
`;
