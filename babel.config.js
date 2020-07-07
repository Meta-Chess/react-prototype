module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "domain/*": "./src/domain/*",
            domain: "./src/domain",
            "primitives/*": "./src/primitives/*",
            primitives: "./src/primitives",
          },
        },
      ],
    ],
  };
};
