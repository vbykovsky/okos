const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = () => ({
  mode: "production",

  entry: "./src/index",
  output: {
    path: path.resolve("./dist"),
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@okos": path.resolve("./src"),
    },
  },

  plugins: [new CleanWebpackPlugin()],

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
