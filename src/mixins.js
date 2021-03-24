import { title, links, author } from "@/config";

// navbar nixins
export const navbar = {
  data: () => ({
    darkMode: false,
    clipped: false,
    drawer: false,
    fixed: false,
    miniVariant: false,
    right: false,
    title,
    links,
    // langs
    langs: [
      { code: "en", label: "English" },
      { code: "ar", label: "العربية" },
      { code: "fr", label: "Français" },
    ],
    rtlLangs: ["ar"],
    tabsList: [
      { icon: "phone", label: "phones" },
      { icon: "rss", label: "today" },
      { icon: "chart-bar", label: "total" },
      { icon: "thermometer", label: "vaccinated" },
      { icon: "chart-pie", label: "distribution" },
    ],
  }),
  beforeMount() {
    this.darkMode = this.getLocalStorage("darkMode");
    this.$vuetify.theme.dark = this.darkMode;
    this.changeLang(this.getLocalStorage("lang"));
  },
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = this.darkMode = !this.$vuetify.theme.dark;
      this.updateLocalStorage("darkMode", this.darkMode);
    },
    changeLang(langCode) {
      this.$i18n.locale = this.$vuetify.lang.current = langCode;
      this.$vuetify.rtl = this.right = this.rtlLangs.includes(langCode);

      const html = document.querySelector("html");
      html.setAttribute("dir", this.right ? "rtl" : "ltr");
      html.setAttribute("lang", langCode);

      this.updateLocalStorage("lang", this.$i18n.locale);
    },
    updateLocalStorage(prop, val) {
      window.localStorage.setItem(prop, JSON.stringify(val));
      console.log(prop + ": " + val);
    },
    getLocalStorage(prop) {
      return JSON.parse(window.localStorage.getItem(prop));
    },
  },
};

// footer nixins
export const footer = {
  data: () => ({
    fixed: false,
    title,
    links,
    author,
  }),
};

// here you can define your global functions to use everywhere
export const global = {
  methods: {
    xyz() {
      console.log("XYZ mixin/method called in HelloWorld component");
    },
  },
};
