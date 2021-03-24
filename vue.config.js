const { name } = require("./package.json");

module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    port: 2020,
    open: true,
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },

  pwa: {
    name: name
      .split("-")
      .map(s => s[0])
      .join(" "),
    themeColor: "#1E88E5",
    msTileColor: "#fff",
  },
};
