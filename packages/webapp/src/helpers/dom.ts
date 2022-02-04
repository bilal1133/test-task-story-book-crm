import {
  canEditProtectedTemplates, isClient
} from '@app/helpers';

export const setInnerHTML = (markup: string | undefined): { __html: string } => {
  // to be used in conjunction with dangerouslySetInnerHTML
  return { __html: markup ?? '' };
};

export const shouldScrollToElement = (elementDomId?: string): void => {
  if (!isClient() || !elementDomId) return;
  const domId = elementDomId.trim();
  if (!!domId.length && !domId.includes(' ')) document.querySelector(`#${domId}`)?.scrollIntoView({ behavior: 'smooth' });
};

export const toggleShadow = (elementDomId: string, className = 'shadow'): void => {
  if (!isClient() || !elementDomId || !elementDomId.length) return;
  const domId = elementDomId.trim();
  const el = document.querySelector(`#${domId}`);
  if (!el) return;
  if (window.pageYOffset > 0) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
};

export const getHeightForSidebarContent = (): number | undefined => {
  if (!isClient()) return;
  return window.innerHeight - 75 - (canEditProtectedTemplates() ? 50 : 0); // BEWARE: '75px' is the height of the navbar, '50px' is the height of the banner
};
