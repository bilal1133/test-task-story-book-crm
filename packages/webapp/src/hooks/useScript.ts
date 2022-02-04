import { isClient } from '@app/helpers';
import { HTMLAttributes } from 'react';

export const useScript = ({
  src,
  attrs,
  onAlreadyLoaded,
  onLoad,
  onError
}: {
  src?: string;
  attrs?: HTMLAttributes<HTMLScriptElement> & { [customAttr: string]: string };
  onAlreadyLoaded?: () => void;
  onLoad?: () => void;
  onError?: OnErrorEventHandler;
  }): void => {

  if (!src?.length) return;

  if (!isClient()) {
    return;
  }

  console.group('useScript');
  console.log('src', src);
  console.groupEnd();

  if (document.querySelectorAll(`script[src="${src}"]`).length) {
    if (onAlreadyLoaded) onAlreadyLoaded();
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.async = true;

  if (attrs) {
    Object.assign(script, attrs);
  }

  if (onLoad) {
    script.onload = onLoad;
  }

  script.onerror = (error) => {
    console.log('ERROR useScript -> onerror', src, error);
    if (onError) {
      onError(error);
    }
  };

  document.body.appendChild(script);
};
