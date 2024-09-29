/* config-overrides.js */

module.exports = {
  webpack: function (config, env) {
    if (process.env.NODE_ENV === "production") {
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
            utils: {
              test: /[\\/]src\/components[\\/]/,
              name: "components",
              chunks: "all",
            },
          },
        },
      };
    }
    config = {
      ...config,
    };
    return config;
  },
};
