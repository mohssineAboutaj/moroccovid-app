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

      <template v-slot:append>
        <div class="pa-2">
          <v-subheader class="text-capitalize">follow us</v-subheader>
          <v-row v-if="!miniVariant" class="justify-space-around">
            <v-col
              v-for="(c, i) in contacts"
              :key="`follow-key-${i}`"
              cols="auto"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :href="c.link"
                    target="_blanc"
                    v-on="on"
                    :style="`background-color: ${c.color}`"
                    depressed
                    fab
                    dark
                    small
                  >
                    <v-icon>fab fa-{{ c.icon }}</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">{{ c.label }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      :fixed="fixed"
      color="primary"
      dark
      app
      extension-height="70"
      hide-on-scroll
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
            <v-icon>fa-language</v-icon>
          </v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item-group v-model="selectedLang" color="primary">
            <v-list-item
              v-for="(item, index) in langs"
              :key="index"
              @click="changeLang(item.code)"
              :value="item.code"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-app-bar-nav-icon @click="switchTheme()">
        <v-icon>{{ darkMode ? "fas" : "far" }} fa-moon</v-icon>
      </v-app-bar-nav-icon>

      <template v-slot:extension v-if="$route.name === 'Home'">
        <v-tabs
          v-model="activeTab"
          background-color="primary"
          centered
          dark
          icons-and-text
          show-arrows
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            v-for="(tab, j) in tabsList"
            :key="j"
            :href="'#' + tab.label"
            @click="$vuetify.goTo('#' + tab.label)"
          >
            <span class="text-capitalize">{{ $t(tab.label) }}</span>
            <v-icon class="mb-2">fa-{{ tab.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { navbar } from "@/mixins";

export default {
  mixins: [navbar],
  data: () => ({
    contacts: [
      {
        label: "follow me on linkedin",
        icon: "linkedin",
        color: "#0077b5",
        link: "https://www.linkedin.com/in/mohssineAboutaj",
        isBrand: true,
      },
      {
        label: "follow me on twitter",
        icon: "twitter",
        color: "#1da1f2",
        link: "https://twitter.com/mohssineAboutaj",
        isBrand: true,
      },
      {
        label: "follow me on github",
        icon: "github",
        color: "#333",
        link: "https://github.com/mohssineAboutaj",
        isBrand: true,
      },
    ],
  }),
};
</script>
