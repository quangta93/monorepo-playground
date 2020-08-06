module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "chrome >=70",
        modules: false,
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    [
      "babel-plugin-transform-imports",
      {
        "@material-ui/core": {
          // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
          transform: "@material-ui/core/esm/${member}",
          preventFullImport: true,
        },
        "@material-ui/icons": {
          // Use "transform: '@material-ui/icons/${member}'," if your bundler does not support ES modules
          transform: "@material-ui/icons/esm/${member}",
          preventFullImport: true,
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs"],
    },
  },
}
