const path = require("path")
const { HotModuleReplacementPlugin } = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const ThreadsPlugin = require("threads-plugin")
const WebpackBar = require("webpackbar")

module.exports = function (_, argv) {
  const BASE_DIR = process.cwd()
  const DIST_DIR = path.resolve(BASE_DIR, "dist")
  const CONFIG_DIR = path.resolve(BASE_DIR, `env/${argv.mode}`)

  const isDev = argv.mode === "development"

  const config = {
    mode: argv.mode,
    entry: [
      path.resolve(BASE_DIR, "src/index.tsx"),
      path.resolve(CONFIG_DIR, "config.ts"),
    ],
    output: {
      path: DIST_DIR,
      filename: `bundle${argv.mode === "production" ? ".[hash]" : ""}.js`,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", "jsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(BASE_DIR, "tsconfig.json"),
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(j|t)s(x)?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    devtool:
      argv.mode === "production" ? "source-map" : "eval-cheap-source-map",
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
      noInfo: true,
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(CONFIG_DIR, "public"),
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(BASE_DIR, "index.html"),
        inject: "body",
      }),
      new MiniCssExtractPlugin({
        filename: `[name]${argv.mode === "production" ? ".[hash]" : ""}.css`,
        chunkFilename: `[id]${argv.mode === "production" ? ".[hash]" : ""}.css`,
      }),
      new CleanWebpackPlugin(),
      isDev && new HotModuleReplacementPlugin(),
      isDev && new WebpackBar(),
      new ThreadsPlugin({
        globalObject: "self",
      }),
      new ManifestPlugin(),
    ].filter(Boolean),
  }

  if (argv.mode === "production") {
    config.optimization = {
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new OptimizeCSSAssetsPlugin(),
      ],
    }
  }

  return config
}
