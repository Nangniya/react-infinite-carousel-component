# react-infinite-carousel-component

CommonJS와 ESModule을 모두 지원하는 리액트 무한 캐러셀 컴포넌트 라이브러리입니다.

![npm](https://img.shields.io/npm/v/react-infinite-carousel-component)
![license](https://img.shields.io/npm/l/react-infinite-carousel-component)

## 설치

```bash
npm install react-infinite-carousel-component
```

#### 또는

```bash
yarn add react-infinite-carousel-component
```

#### 또는

```bash
pnpm add react-infinite-carousel-component
```

# Props

| 속성                  | 타입            | 기본값      | 설명                                                                                                                                                                                                                                                                                                                |
| --------------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`            | React.ReactNode | -           | (필수) 캐러셀에 표시할 슬라이드 컨텐츠                                                                                                                                                                                                                                                                              |
| `slidesToScroll`      | number          | 1           | 한 번에 스크롤할 슬라이드 수                                                                                                                                                                                                                                                                                        |
| `gap`                 | number          | 0           | 슬라이드 아이템 간의 간격(px)                                                                                                                                                                                                                                                                                       |
| `leftArrow`           | React.ReactNode | 기본 화살표 | 왼쪽 화살표 커스텀 컴포넌트                                                                                                                                                                                                                                                                                         |
| `rightArrow`          | React.ReactNode | 기본 화살표 | 오른쪽 화살표 커스텀 컴포넌트                                                                                                                                                                                                                                                                                       |
| `auto`                | boolean         | false       | 자동 재생 활성화 여부                                                                                                                                                                                                                                                                                               |
| `interval`            | number          | 4           | 자동 재생 시 슬라이드 전환 간격 (초 단위)                                                                                                                                                                                                                                                                           |
| `arrowsOverlay`       | boolean         | false       | `true`: 화살표가 슬라이드 위에 오버레이됨<br/>`false`: 화살표가 슬라이드 영역 양 옆 외부에 위치                                                                                                                                                                                                                     |
| `arrowsAlwaysVisible` | boolean         | false       | `true` : 화살표가 항상 보임<br />`false` : 컨테이너에 마우스 hover시에만 화살표가 보임                                                                                                                                                                                                                              |
| `responsive`          | Array           | []          | 반응형 설정을 위한 배열<br /><br /> 각 객체에 포함할 속성 : <br />- `breakpoint` : 해당 너비(px) 이상에서 적용할 분기점 <br />- `slidesToScroll` : 해당 breakpoint에서 적용할 슬라이드 스크롤 수<br /> <br />예시 : `responsive: [{ breakpoint: 1024, slidesToScroll: 6 }, { breakpoint: 600, slidesToScroll: 2 }]` |

## 사용 예시

### 수동, 슬라이드 수 1개, 화살표 바깥쪽

```jsx
import InfiniteSlide from 'react-infinite-carousel-component';
import 'react-infinite-carousel-component/style.css';

function App() {
  const settings = {
    slidesToScroll: 1,
    gap: 20,
    arrowsAlwaysVisible: true,
  };

  return (
    <InfiniteSlide {...settings}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </InfiniteSlide>
  );
}

export default App;
```

<img src="https://i.ibb.co/B27SppMp/image.gif" alt="예시 1" border="0" width="100%"/>

### 자동, 슬라이드 수 여러개, 반응형, 화살표 overlay

```jsx
import InfiniteSlide from 'react-infinite-carousel-component';
import 'react-infinite-carousel-component/style.css';

function App() {
  const settings = {
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

  return (
    <InfiniteSlide {...settings}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
    </InfiniteSlide>
  );
}
```

#### 1024 breakpoint

<img src="https://i.ibb.co/whYHHFdK/1.gif" alt="예시 2 - 1" border="0" width="100%"/>

#### 600 breakpoint

<img src="https://i.ibb.co/C3vL66Vn/2.gif" alt="예시 2 - 2" border="0" width="100%"/>

## 기술 스택

- **React** : 18, 19버전 지원
- **TypeScript** : 타입스크립트 지원
- **Vanilla Extract** : zero-runtime & 클래스네임 중복 방지, 동적 스타일링은 인라인으로 보완
- **Vite** : 라이브러리 모드로 번들링 (CommonJS와 ESModule 지원)
