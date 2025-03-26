import InfiniteSlide from './lib/InfiniteSlide/InfiniteSlide';

const App = () => {
  const settings1 = {
    slidesToScroll: 1,
    gap: 20,
    arrowsAlwaysVisible: true,
  };

  const slideItem1Style = {
    display: 'flex',
    width: '100dvw',
    height: '200px',
    backgroundColor: 'orange',
  };

  const settings2 = {
    leftArrow: <span style={{ fontSize: '24px' }}>⬅️</span>,
    rightArrow: <span style={{ fontSize: '24px' }}>➡️</span>,
    responsive: [
      { breakpoint: 1024, slidesToScroll: 4 },
      { breakpoint: 600, slidesToScroll: 2 },
    ],
    gap: 20,
    arrowsOverlay: true,
    auto: true,
    interval: 2,
  };

  const slideItemStyle = {
    display: 'flex',
    width: '326px',
    height: '200px',
  };

  const slideItemH3Style = {
    width: '100%',
    backgroundColor: 'skyblue',
  };

  return (
    <>
      <article style={{ padding: '20px 0' }}>
        <InfiniteSlide {...settings1}>
          <div style={slideItem1Style}>
            <h3>1</h3>
          </div>
          <div style={slideItem1Style}>
            <h3>2</h3>
          </div>
          <div style={slideItem1Style}>
            <h3>3</h3>
          </div>
        </InfiniteSlide>
      </article>
      <article style={{ padding: '20px' }}>
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
      </article>
      <p>hi</p>
    </>
  );
};

export default App;
