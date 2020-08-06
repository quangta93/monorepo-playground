const path = require("path")
const { HotModuleReplacementPlugin } = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ThreadsPlugin = require("threads-plugin")

module.exports = function (_, argv) {
  const BASE_DIR = process.cwd()
  const DIST_DIR = path.resolve(BASE_DIR, "dist")
  const CONFIG_DIR = path.resolve(BASE_DIR, `env/${argv.mode}`)

  const config = {
    mode: argv.mode,
    entry: path.resolve(BASE_DIR, "src/index.tsx"),
    output: {
      path: DIST_DIR,
      filename: `bundle${argv.mode === "production" ? ".[hash]" : ""}.js`,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", "jsx"],
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
    devServer: {
      port: 3000,
      hot: true,
      inline: true,
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
      new HotModuleReplacementPlugin(),
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
