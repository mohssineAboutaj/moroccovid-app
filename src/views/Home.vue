<template>
  <v-container class="home">
    <v-card class="my-2 transparent" elevation="0">
      <v-card-title class="text-capitalize mb-2">statistics</v-card-title>
      <v-card-text>
        <v-row v-if="statsInProgress" wrap>
          <v-col
            v-for="s in statisticsExpectLength"
            :key="s"
            cols="12"
            md="6"
            lg="3"
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
            lg="3"
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
    <v-card class="my-2 transparent" elevation="0">
      <v-card-title class="text-capitalize mb-2">today statistics</v-card-title>
      <v-card-text>
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
    </v-card>
    <v-card class="my-2 " max-height="500" elevation="4">
      <v-card-title class="text-capitalize">
        vaccinated people growth
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
    apiURL: "https://moroccovid-19-api.herokuapp.com/",
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
  created() {
    this.$axios
      .get(this.apiURL)
      .then(({ data }) => {
        const {
          vaccine: { timeline },
          covid,
        } = data;

        // statistics
        this.statistics.push(
          {
            icon: "fa-users",
            color: "primary",
            title: "total cases",
            value: covid.cases,
          },
          {
            icon: "fa-users",
            color: "primary",
            title: "total tests",
            value: covid.tests,
          },
          {
            icon: "fa-users",
            color: "primary",
            title: "active",
            value: covid.active,
          },
          {
            icon: "fa-users",
            color: "primary",
            title: "total deaths",
            value: covid.deaths,
          },
        );

        // today statistics
        this.todayStatistics.push(
          {
            icon: "fa-users",
            color: "primary",
            title: "today cases",
            value: covid.todayCases,
          },
          {
            icon: "fa-users",
            color: "primary",
            title: "total recovered",
            value: covid.todayRecovered,
          },
          {
            icon: "fa-users",
            color: "primary",
            title: "today deaths",
            value: covid.todayDeaths,
          },
        );

        // set expected length for loading
        this.statisticsExpectLength = this.statistics.length - 1;
        this.todayStatisticsExpectLength = this.todayStatistics.length - 1;

        // vaccine
        this.vaccineData = {
          labels: Object.keys(timeline),
          datasets: [
            {
              label: "vaccinated people",
              backgroundColor: this.backgroundColor,
              data: Object.values(timeline),
            },
          ],
        };
      })
      .catch(err => {
        console.log(err);
      });
    this.backgroundColor = globalColorsPallette.primary;
    this.statsInProgress = false;
  },
};
</script>
