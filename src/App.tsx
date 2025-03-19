import InfiniteSlide from './lib/InfiniteSlide/InfiniteSlide';
import Arrow from './assets/icons/arrow.svg?react';

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
  const slideItemStyle = {
    display: 'flex',
    width: '250px',
    height: '200px',
    padding: '20px',
  };

  const slideItemH3Style = {
    width: '100%',
    backgroundColor: 'skyblue',
  };
  const slideItem1Style = {
    display: 'flex',
    width: '100dvw',
    height: '200px',
    padding: '20px',
  };

  const slideItem1H3Style = {
    width: '100%',
    backgroundColor: 'orange',
  };
  return (
    <>
      <InfiniteSlide {...settings1}>
        <div style={slideItem1Style}>
          <h3 style={slideItem1H3Style}>1</h3>
        </div>
        <div style={slideItem1Style}>
          <h3 style={slideItem1H3Style}>2</h3>
        </div>
        <div style={slideItem1Style}>
          <h3 style={slideItem1H3Style}>3</h3>
        </div>
      </InfiniteSlide>
      <InfiniteSlide {...settings2}>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>1</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>2</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>3</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>4</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>5</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>6</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>7</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>8</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>9</h3>
        </div>
        <div style={slideItemStyle}>
          <h3 style={slideItemH3Style}>10</h3>
        </div>
      </InfiniteSlide>
      <p>hi</p>
    </>
  );
};

export default App;
