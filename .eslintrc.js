/**
 * ! use prettier for .scss, and ESLint for .ts/.tsx
 *
 * Why? Initially, we installed ESLint + Prettier,
 * but then we learn that the Prettier plugin is preventing the 'react/jsx' rules from working,
 * therefore we disabled it.
 *
 * guides
 * https://dev.to/onygami/eslint-and-prettier-for-react-apps-bonus-next-js-and-typescript-3e46
 * https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
 * https://scotch.io/tutorials/linting-and-formatting-with-eslint-in-vs-code
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: { jsx: true // Allows for the parsing of JSX
    }
  },
  settings: { react: { version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
  } },
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended', // Uses the recommended rules from eslint
    'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Uses the recommended rules from eslint-plugin-react
    'plugin:react-hooks/recommended', // Uses the recommended rules from eslint-plugin-react-hooks
    'plugin:jsx-a11y/recommended' // Uses the recommended rules from eslint-plugin-jsx-a11y
    // 'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // 'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
    // ^^^^ Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    indent: [
      2,
      2
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      2,
      'always'
    ],
    'array-bracket-newline': [
      2,
      { minItems: 1 }
    ],
    'array-element-newline': [
      2,
      'always'
    ],
    'comma-dangle': [
      2,
      'never'
    ],
    'eol-last': [
      2,
      'always'
    ],
    // 'function-paren-newline' : [
    //   2,
    //   { minItems: 2 }
    // ], // waiting on a rule which supports multuline destructured parameter as well
    'jsx-quotes': [
      2,
      'prefer-double'
    ],
    'max-len': [
      2,
      180
    ],
    'multiline-ternary': [
      2,
      'always-multiline'
    ],
    'no-multiple-empty-lines': [
      2,
      { max: 1 }
    ],
    'no-trailing-spaces': [
      2,
      { skipBlankLines: false }
    ],
    'object-curly-newline': [
      2,
      { minProperties: 2 }
    ],
    'object-curly-spacing': [
      2,
      'always'
    ],
    'object-property-newline': [
      2,
      { allowAllPropertiesOnSameLine: false }
    ],
    'react/jsx-closing-bracket-location': [
      1,
      'line-aligned'
    ],
    'react/jsx-first-prop-new-line': [
      2,
      'multiline-multiprop'
    ], // incompatible with prettier
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
        when: 'always'
      }
    ], // incompatible with prettier
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
      // fixes error on next.js 'Link' component
        components: [
          'Link'
        ],
        specialLink: [
          'hrefLeft',
          'hrefRight'
        ],
        aspects: [
          'invalidHref',
          'preferButton'
        ]
      }
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off'
  }
};
