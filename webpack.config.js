const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ThreadsPlugin = require("threads-plugin");

module.exports = function (_, argv) {
  const BASE_DIR = process.cwd();
  const DIST_DIR = path.resolve(BASE_DIR, "dist");
  const CONFIG_DIR = path.resolve(BASE_DIR, `env/${argv.mode}`);

  return {
    entry: path.resolve(BASE_DIR, "src/index.tsx"),
    output: {
      path: DIST_DIR,
      filename: `bundle${argv.mode === "production" ? ".[hash]" : ""}.js`,
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
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
      ],
    },
    devServer: {
      contentBase: DIST_DIR,
      hot: true,
      port: 3000,
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
        template: path.resolve(CONFIG_DIR, "public/index.html"),
        inject: "body",
      }),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new ThreadsPlugin({
        globalObject: "self",
      }),
      new ManifestPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: [".tsx", ".ts", ".js", "jsx"],
    },
  };
};
