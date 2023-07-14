const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssOptions = require("./postcss.config");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  devServer: {
    static: [{ directory: path.join(__dirname, "build") }, { directory: path.join(__dirname, "public") }],
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env"],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
              [
                "@babel/preset-typescript",
                {
                  tsconfig: "./tsconfig.json",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          { loader: "postcss-loader", options: { postcssOptions: { ...postcssOptions, config: false } } },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 1,
              modules: true,
            },
          },
          { loader: "postcss-loader", options: { postcssOptions: { ...postcssOptions, config: false } } },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"],
      },
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".tsx", ".ts"],
  },
};
