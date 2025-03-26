import React, { useEffect, useLayoutEffect, useState } from 'react';
import InnerInfiniteSlide from '../InnerInfiniteSlide/InnerInfiniteSlide';
import { IProps } from './InfiniteSlide.types';

const InfiniteSlide: React.FC<IProps> = ({
  slidesToScroll = 1,
  children,
  leftArrow,
  rightArrow,
  auto = false,
  interval = 4,
  responsive = [],
  arrowsOverlay = false,
  arrowsAlwaysVisible = false,
  gap = 0,
}) => {
  const [effectiveSlidesToScroll, setEffectiveSlidesToScroll] = useState(0);

  const updateSlidesToScroll = () => {
    if (responsive.length > 0) {
      const width = window.innerWidth;
      const matchedSetting = responsive.sort((a, b) => b.breakpoint - a.breakpoint).find((r) => width >= r.breakpoint);

      if (matchedSetting) {
        setEffectiveSlidesToScroll(matchedSetting.slidesToScroll);
      } else {
        setEffectiveSlidesToScroll(slidesToScroll);
      }
    } else {
      setEffectiveSlidesToScroll(slidesToScroll);
    }
  };

  useLayoutEffect(() => {
    updateSlidesToScroll();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateSlidesToScroll);

    return () => {
      window.removeEventListener('resize', updateSlidesToScroll);
    };
  }, [responsive, slidesToScroll]);

  return (
    <InnerInfiniteSlide
      slidesToScroll={effectiveSlidesToScroll}
      children={children}
      gap={gap}
      leftArrow={leftArrow || null}
      rightArrow={rightArrow || null}
      auto={auto}
      interval={interval}
      arrowsOverlay={arrowsOverlay}
      arrowsAlwaysVisible={arrowsAlwaysVisible}
      responsive={responsive}
    />
  );
};

export default InfiniteSlide;
