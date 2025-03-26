interface IResponsiveSetting {
  breakpoint: number;
  slidesToScroll: number;
}

export interface IProps {
  slidesToScroll?: number;
  children: React.ReactNode;
  gap?: number; // 요소들 사이의 간격
  leftArrow?: React.ReactNode;
  rightArrow?: React.ReactNode;
  auto?: boolean;
  interval?: number; // auto일 때 시간 간격
  responsive?: IResponsiveSetting[]; // 반응형
  arrowsOverlay?: boolean; // 화살표를 컨텐츠 위에 겹치게 할지 여부
  arrowsAlwaysVisible?: boolean; // 화살표를 항상 표시할지 여부
}
