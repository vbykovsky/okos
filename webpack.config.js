const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = () => ({
  mode: "development",

  entry: "./src/example/index",
  output: {
    path: path.resolve("./dist"),
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  devtool: "source-map",
  devServer: {
    port: 3000,
    hot: true,
    compress: true,
    client: {
      overlay: true,
      progress: true,
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: "./src/example/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          "ts-loader",
        ],
        exclude: [/node_modules/, /\.(test|spec)\.(ts|tsx)$/],
      },
    ],
  },
});
