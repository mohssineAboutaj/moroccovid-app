<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center text-capitalize mb-2">
        {{ $t("news") }}
      </v-card-title>
      <v-card-subtitle class="justify-center text-capitalize mb-2">
        {{ $t("official news") }}
      </v-card-subtitle>
      <v-card-text class="caption" dir="rtl">
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" three-line>
            <v-list-item-content class="caption">
              {{ item.text }}
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn
                small
                color="primary"
                download
                :href="item.link"
                target="_blanc"
              >
                <span class="mx-2 hidden-md-and-down">
                  {{ $t("download") }}
                </span>
                <v-icon>fa-cloud-download-alt</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    /// api
    apiBaseURL: "https://moroccovid-19-api.herokuapp.com/",
    /// data
    items: [],
  }),
  beforeMount() {
    this.$axios.get(this.apiBaseURL + "reports").then(({ data }) => {
      data.forEach(r => {
        this.items.push({
          text: r.label,
          link: r.link,
        });
      });
    });
  },
};
</script>
