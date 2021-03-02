<template>
  <v-container class="home">
    <v-card class="my-2 transparent" elevation="0">
      <v-card-title class="text-capitalize mb-2">
        {{ $t("important phone numbers") }}
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col
            v-for="(num, k) in importantPhoneNumbers"
            :key="k"
            cols="12"
            md="6"
          >
            <v-img :src="require(`@/assets/${num}`)"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="my-2 transparent" elevation="0">
      <v-card-title class="text-capitalize mb-2">
        {{ $t("today statistics") }}
      </v-card-title>
      <v-card-text v-if="isTodayStatsReady">
        <v-row v-if="statsInProgress" wrap>
          <v-col
            v-for="s in todayStatisticsExpectLength"
            :key="s"
            cols="12"
            md="4"
          >
            <v-skeleton-loader max-width="" type="image"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else wrap>
          <v-col
            v-for="stat in todayStatistics"
            :key="stat.title"
            cols="12"
            md="4"
          >
            <stats-card
              :color="stat.color"
              :icon="stat.icon"
              :title="stat.title"
              :value="stat.value"
              :elevation="5"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        <h2 class="headline text-center text-capitalize">
          {{ $t("come back after") }} 18:00 GMT+1
        </h2>
      </v-card-text>
    </v-card>
    <v-card class="my-2 transparent" elevation="0">
      <v-card-title class="text-capitalize mb-2">
        {{ $t("statistics") }}
      </v-card-title>
      <v-card-text>
        <v-row v-if="statsInProgress" wrap>
          <v-col
            v-for="s in statisticsExpectLength"
            :key="s"
            cols="12"
            md="6"
            lg="4"
          >
            <v-skeleton-loader max-width="" type="image"></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else wrap>
          <v-col
            v-for="stat in statistics"
            :key="stat.title"
            cols="12"
            md="6"
            lg="4"
          >
            <stats-card
              :color="stat.color"
              :icon="stat.icon"
              :title="stat.title"
              :value="stat.value"
              :elevation="5"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="my-2 " max-height="500" elevation="4">
      <v-card-title class="text-capitalize">
        {{ $t("vaccinated people growth") }}
      </v-card-title>
      <v-card-text>
        <line-chart-component
          :chartData="vaccineData"
          :options="options"
        ></line-chart-component>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import StatsCard from "@/components/cards/StatsCard";
import { LineChartComponent } from "@/components/general/charts";
import { globalColorsPallette } from "@/plugins/vuetify";

export default {
  name: "Home",
  components: {
    LineChartComponent,
    StatsCard,
  },
  data: () => ({
    importantPhoneNumbers: [],
    apiBaseURL: "https://moroccovid-19-api.herokuapp.com/",
    statsInProgress: true,
    statisticsExpectLength: 0,
    statistics: [],
    todayStatistics: [],
    todayStatisticsExpectLength: 0,
    vaccineData: {},
    backgroundColor: "",
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  computed: {
    isTodayStatsReady() {
      return new Date().getUTCHours() + 1 >= 18;
    },
  },
  created() {
    this.importantPhoneNumbers.push(
      "Affichesallocorona-01.jpg",
      "Affichesallocorona-02.jpg",
    );

    // statistics
    this.$axios.get(this.apiBaseURL + "covid").then(({ data: covid }) => {
      /// main stats
      this.statistics.push(
        {
          icon: "fa-users",
          color: "primary",
          title: this.$t("total cases"),
          value: covid.cases,
        },
        {
          icon: "fa-users",
          color: "success",
          title: this.$t("total recovered cases"),
          value: covid.recovered,
        },
        {
          icon: "fa-users",
          color: "secondary",
          title: this.$t("total tests cases"),
          value: covid.tests,
        },
        {
          icon: "fa-users",
          color: "warning",
          title: this.$t("active cases"),
          value: covid.active,
        },
        {
          icon: "fa-users",
          color: "deep-orange",
          title: this.$t("critical cases"),
          value: covid.critical,
        },
        {
          icon: "fa-users",
          color: "error",
          title: this.$t("total deaths cases"),
          value: covid.deaths,
        },
      );

      /// today stats
      if (this.isTodayStatsReady) {
        this.todayStatistics.push(
          {
            icon: "fa-users",
            color: "primary",
            title: this.$t("today cases cases"),
            value: covid.todayCases,
          },
          {
            icon: "fa-users",
            color: "success",
            title: this.$t("today recovered cases"),
            value: covid.todayRecovered,
          },
          {
            icon: "fa-users",
            color: "error",
            title: this.$t("today deaths cases"),
            value: covid.todayDeaths,
          },
        );
      }

      // set expected length for loading
      this.statisticsExpectLength = this.statistics.length - 1;
      this.todayStatisticsExpectLength = this.todayStatistics.length - 1;

      // for skeleton loader
      this.statsInProgress = false;
    });

    // vaccine
    this.$axios
      .get(this.apiBaseURL + "vaccine")
      .then(({ data: { timeline } }) => {
        this.vaccineData = {
          labels: Object.keys(timeline),
          datasets: [
            {
              label: this.$t("vaccinated people"),
              backgroundColor: this.backgroundColor,
              data: Object.values(timeline),
            },
          ],
        };
      });

    this.backgroundColor = globalColorsPallette.primary;
  },
};
</script>
