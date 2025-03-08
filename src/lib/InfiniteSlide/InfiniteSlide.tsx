import React, { useLayoutEffect, useState } from 'react';
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
}) => {
  const [effectiveSlidesToScroll, setEffectiveSlidesToScroll] = useState(0);
  useLayoutEffect(() => {
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
  }, []);

  return (
    <InnerInfiniteSlide
      slidesToScroll={effectiveSlidesToScroll}
      children={children}
      leftArrow={leftArrow}
      rightArrow={rightArrow}
      auto={auto}
      interval={interval}
    />
  );
};

export default InfiniteSlide;
