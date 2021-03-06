<template>
  <div class="navbar-component">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :clipped-right="clipped"
      :fixed="fixed"
      :right="right"
      color="primary"
      dark
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in links"
          v-show="!item.hidden"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>fas fa-{{ item.icon }} </v-icon>
          </v-list-item-action>
          <v-list-item-content class="mx-2">
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      :fixed="fixed"
      color="primary"
      dark
      app
      extension-height="70"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>fa-stream</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title class="hidden-sm-and-down">{{ title }}</v-toolbar-title>
      <v-toolbar-title class="hidden-md-and-up">
        {{
          title
            .split(" ")
            .map(s => s[0])
            .join(" ")
        }}
      </v-toolbar-title>
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on">
            <v-icon>fa-globe</v-icon>
          </v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in langs"
            :key="index"
            @click="changeLang(item.code)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-app-bar-nav-icon @click="switchTheme()">
        <v-icon>{{ darkMode ? "fas" : "far" }} fa-moon</v-icon>
      </v-app-bar-nav-icon>

      <template v-slot:extension v-if="$route.name === 'Home'">
        <v-tabs
          align-with-title
          show-arrows
          fixed-tabs
          icons-and-text
          optional
          dark
          active-class="font-weight-bold white--text"
          v-model="activeTab"
          hide-slider
        >
          <v-tab
            v-for="(tab, j) in tabsList"
            :key="j"
            @click="$vuetify.goTo('#' + tab.label)"
          >
            <span>{{ $t(tab.label) }}</span>
            <v-icon class="mb-2">fa-{{ tab.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { general } from "@/mixins/navbar.js";

export default {
  mixins: [general],
  data: () => ({
    activeTab: 0,
    langs: [
      { code: "en", label: "English" },
      { code: "ar", label: "العربية" },
      { code: "fr", label: "Français" },
    ],
    rtlLangs: ["ar"],
    tabsList: [
      { icon: "phone", label: "phones" },
      { icon: "rss", label: "today" },
      { icon: "thermometer", label: "vaccinated" },
      { icon: "chart-pie", label: "distribution" },
    ],
  }),
  methods: {
    changeLang(langCode) {
      this.$i18n.locale = this.$vuetify.lang.current = langCode;
      this.$vuetify.rtl = this.right = this.rightDrawer = this.rtlLangs.includes(
        langCode,
      );
    },
  },
};
</script>
