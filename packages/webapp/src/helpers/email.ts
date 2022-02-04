export const isValidEmail = (email: string): boolean => {
  email = email.trim();

  if (!email.length) return false;

  // https://gist.github.com/dreamstarter/9231254#gistcomment-2634891
  const re = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  return re.test(email);
};
