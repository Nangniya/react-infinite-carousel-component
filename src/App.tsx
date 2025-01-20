import InfiniteSlide from './lib/InfiniteSlide/InfiniteSlide';
import Arrow from './assets/icons/arrow.svg';
import * as S from './App.styles';

const App = () => {
  return (
    <InfiniteSlide auto={true}>
      <S.SlideLi>
        <h3>1</h3>
      </S.SlideLi>
      <S.SlideLi>
        <h3>2</h3>
      </S.SlideLi>
      <S.SlideLi>
        <h3>3</h3>
      </S.SlideLi>
      <S.SlideLi>
        <h3>4</h3>
      </S.SlideLi>
      <S.SlideLi>
        <h3>5</h3>
      </S.SlideLi>
      <S.SlideLi>
        <h3>6</h3>
      </S.SlideLi>
    </InfiniteSlide>
  );
};

export default App;
