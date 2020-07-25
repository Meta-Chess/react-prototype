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
            "navigation/*": "./src/navigation/*",
            navigation: "./src/navigation",
            "primitives/*": "./src/primitives/*",
            primitives: "./src/primitives",
            "ui/*": "./src/ui/*",
            ui: "./src/ui",
            "utilities/*": "./src/utilities/*",
            utilities: "./src/utilities",
          },
        },
      ],
    ],
  };
};
