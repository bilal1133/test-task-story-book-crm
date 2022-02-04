/* eslint-disable @typescript-eslint/no-var-requires */

const nextJsConfig = {

  webpack5: false, // force use webpack 4, else get https://github.com/webpack/webpack/issues/12724

  eslint: { ignoreDuringBuilds: true // allows production builds to successfully complete even if your project has ESLint errors
  },

  // sassOptions: { quietDeps: true  }, // removes all 'DEPRECATION WARNING' // BEWARE: private api, does not work. Force using v1.30.0 in package.json

  // trailingSlash: false, // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash // BEWARE: defaults to 'false', therefore no need to enable it
  reactStrictMode: false, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode // TODO: enable strict mode & debug it's working properly

  // BEGIN: HEADERS & CACHING CONSIDERATIONS
  // We don't really need to cache all api endpoints, do we ?
  // An expensive one is '/api/project-shared-with-me', so how can we improve its caching, either logically or request-wise ?
  // END: HEADERS & CACHING CONSIDERATIONS
  // async headers() {
  //   return [
  //     {
  //       source: '/api/project-shared-with-me',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=1, s-maxage=1, stale-while-revalidate=59'
  //         }
  //       ]
  //     }
  //   ];
  // },

  // BEWARE: do not 'async/await' the webpack function. Source: https://nextjs.org/docs/messages/promise-in-next-config
  webpack: (config, { isServer }) => {
    if (isServer) {
      // require('./utils/generate-sitemap')();
      // require('./utils/check-imports')();
    }
    return config;
  }
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
const withTM = require('next-transpile-modules')([
  '@lolab/components'
]);

module.exports = withBundleAnalyzer(withTM(nextJsConfig));
