import { IonIcon } from '@lolab/components';
import { CSSProperties } from 'react';

type IconProps = {
  wrapperStyle?: CSSProperties;
  style?: CSSProperties;
  onClick(): void;
};
const iconWrapperStyle = { height: '59px', width: '59px', borderRadius: '50%', border: '1px solid #707070', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const iconStyle = { width: '26.55px', height: '26.55px' };
export const ProfileIcon: React.FC<IconProps> = ({ style = iconStyle, wrapperStyle = iconWrapperStyle, onClick }) => {
  return (
    <div style={wrapperStyle} onClick={onClick}>
      <IonIcon style={style} name="camera-outline"></IonIcon>
    </div>
  );
};
