import React from 'react';

if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, { trackAllPureComponents: true });
    console.log('---- ENABLED: why-did-you-render');
  }
}
