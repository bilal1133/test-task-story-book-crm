export const isStorybook = (): boolean => window._isStorybook === true;
export const isClient = (): boolean => typeof window !== 'undefined';
