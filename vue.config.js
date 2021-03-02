module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    port: 2020,
    open: true,
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
};
