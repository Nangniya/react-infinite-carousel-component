interface IResponsiveSetting {
  breakpoint: number;
  slidesToScroll: number;
}

export interface IProps {
  slidesToScroll?: number;
  children: React.ReactNode;
  leftArrow?: React.ReactNode;
  rightArrow?: React.ReactNode;
  auto?: boolean;
  interval?: number; // auto일 때 시간 간격
  responsive?: IResponsiveSetting[]; // 반응형
}
