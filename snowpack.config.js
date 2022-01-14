const path = require("path");
// /** @type {import("snowpack").SnowpackUserConfig } */
// export default {
module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/" },
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    [
      "@snowpack/plugin-typescript",
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: "yarn pnpify tsc" } : {}),
      },
    ],
    "@snowpack/plugin-postcss",
    [
      "@snowpack/plugin-webpack",
      {
        outputPattern: {
          js: "./index.js",
          css: "./index.css",
        },
        extendConfig: (config) => {
          delete config.optimization.splitChunks;
          delete config.optimization.runtimeChunk;
          config.module.rules[0] = {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env"] },
              },
              {
                loader: path.resolve(
                  __dirname,
                  "./node_modules/@snowpack/plugin-webpack/plugins/import-meta-fix.js"
                ),
              },
            ],
          };
          return config;
        },
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // bundle: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
  },
  /* ... */
  buildOptions: {
    /* ... */
  },
};
