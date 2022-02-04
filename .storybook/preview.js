// BEGIN: ! not working ! 
// sass-loader - Transforms Sass to CSS. (Input: Sass, Output: CSS)
// css-loader - Transforms CSS to a JavaScript module. (Input: CSS, Output: JavaScript)
// style-loader - Injects the CSS, that is exported by the JavaScript module, into a <style> tag at runtime. (Input: JavaScript, Output: JavaScript).
// import '!style-loader!css-loader!sass-loader!../styles/styles.scss';
// END: ! not working ! 

import '../storybook-styles.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetically',
    },
  },
}