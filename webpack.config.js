const developmentConfig = require("./configs/webpack.config.dev");
const productionConfig = require("./configs/webpack.config.prod");

module.exports = (env) => {
  try {
    const mode =
      env.development === true
        ? "development"
        : env.production === true
        ? "production"
        : undefined;

    if (!mode) {
      throw new Error("Environment mode is undefined");
    }

    if (mode == "development") {
      return developmentConfig();
    }

    return productionConfig();
  } catch (e) {
    console.log("[WEBPACK ERROR]", e);
    process.exit();
  }
};
