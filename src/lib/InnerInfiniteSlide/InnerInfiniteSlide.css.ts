import { style, keyframes } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
});

const resetButtonStyle = style({
  background: 'none',
  border: 'none',
  outline: 'none',
  padding: 0,
  cursor: 'pointer',
});

const arrowWrapperBase = style([
  resetButtonStyle,
  {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
]);

// 오버레이 모드 화살표 스타일 (hover 시에만 표시)
export const arrowOverlay = style([
  arrowWrapperBase,
  {
    opacity: 0,
    transition: 'opacity 0.3s',
    selectors: {
      [`${container}:hover &`]: {
        opacity: 1,
      },
    },
  },
]);

// 일반 모드 화살표 스타일 (항상 표시)
export const arrowVisible = style([
  arrowWrapperBase,
  {
    opacity: 1, // 항상 보이도록 설정
  },
]);

export const leftArrow = style([
  arrowWrapperBase,
  {
    left: 0,
  },
]);

export const rightArrow = style([
  arrowWrapperBase,
  {
    right: 0,
  },
]);

export const defaultLeftArrow = style({
  '::before': {
    content: '←',
    fontSize: 20,
    padding: '10px',
  },
});

export const defaultRightArrow = style({
  '::before': {
    content: '→',
    fontSize: 20,
    padding: '10px',
  },
});

export const ulWrapper = style({
  overflow: 'hidden',
  width: '100%',
});

export const slideUl = style({
  display: 'flex',
  padding: 0,
  margin: 0,
});

export const slideLi = style({
  flexShrink: 0,
  listStyle: 'none',
});

const progress = keyframes({
  '0%': { width: 0 },
  '100%': { width: '100%' },
});

export const progressBar = style({
  position: 'relative',
  width: '100%',
  height: 3,
  backgroundColor: '#84868d',
  '::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#babac1',
    animationName: progress,
    animationTimingFunction: 'linear',
    animationDuration: 'inherit',
  },
});

export const running = style({
  '::before': {
    animationPlayState: 'running',
  },
});

export const paused = style({
  '::before': {
    animationPlayState: 'paused',
  },
});

export const transitioning = style({
  transition: 'transform 1s ease-in-out',
});

export const transitionNone = style({
  transition: 'none',
});
