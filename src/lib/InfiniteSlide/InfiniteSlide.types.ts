export interface IProps {
  slidesToShow?: number;
  slidesToScroll?: number;
  children: React.ReactNode;
  leftArrow?: React.ReactNode;
  rightArrow?: React.ReactNode;
  gap?: number;
  auto?: boolean;
  interval?: number; // auto일 때 시간 간격
}
