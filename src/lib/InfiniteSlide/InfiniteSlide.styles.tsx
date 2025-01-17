import styled from '@emotion/styled';
import { resetButtonStyle } from '../../styles/common';

export const Container = styled.section`
  position: relatvie;

  &:hover button {
    opacity: 1;
  }
`;

export const ArrowWrapper = styled.button<{ $hasCustomArrow: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${resetButtonStyle};

  &.left {
    left: 40px;
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
    right: 40px;
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
`;

export const SlideUl = styled.ul<{
  $currentSlide: number;
  $isTransitioning: boolean;
}>`
  display: flex;
  // transform, transition 작성
`;
