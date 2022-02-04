import { ColoursHex } from '@app/types';

// https://stackoverflow.com/a/66143374
export const getColoursHexWithAlpha = ({
  hex,
  alpha
}: {
  hex: ColoursHex;
  alpha: number;
}): string => ''
  + `#`
  + hex.replace('#', '')
  + Math.floor((alpha < 0 ? 0 : (alpha > 1 ? 1 : alpha)) * 255).toString(16).padStart(2, '0');
