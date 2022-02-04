import { DetailedHTMLProps } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { name?: string };
    }
  }
}
