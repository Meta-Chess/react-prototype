module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "auth/*": "./src/auth/*",
            auth: "./src/auth",
            "components/*": "./src/components/*",
            components: "./src/components",
            "game/*": "./src/game/*",
            game: "./src/game",
            "navigation/*": "./src/navigation/*",
            navigation: "./src/navigation",
            "primitives/*": "./src/primitives/*",
            primitives: "./src/primitives",
            testHelpers: "./src/testHelpers",
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
