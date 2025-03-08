import InfiniteSlide from './lib/InfiniteSlide/InfiniteSlide';
import Arrow from './assets/icons/arrow.svg?react';
import * as S from './App.styles';

const App = () => {
  const settings1 = {
    rightArrow: <Arrow width="10" height="40" />,
    slidesToScroll: 1,
  };
  const settings2 = {
    rightArrow: <Arrow width="10" height="40" />,
    responsive: [
      { breakpoint: 1024, slidesToScroll: 6 },
      { breakpoint: 600, slidesToScroll: 2 },
    ],
    auto: true,
  };
  return (
    <>
      <InfiniteSlide {...settings1}>
        <S.SlideItem1>
          <h3>1</h3>
        </S.SlideItem1>
        <S.SlideItem1>
          <h3>2</h3>
        </S.SlideItem1>
        <S.SlideItem1>
          <h3>3</h3>
        </S.SlideItem1>
      </InfiniteSlide>
      <InfiniteSlide {...settings2}>
        <S.SlideItem>
          <h3>1</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>2</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>3</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>4</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>5</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>6</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>7</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>8</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>9</h3>
        </S.SlideItem>
        <S.SlideItem>
          <h3>10</h3>
        </S.SlideItem>
      </InfiniteSlide>
    </>
  );
};

export default App;
