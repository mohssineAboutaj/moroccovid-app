<template>
  <v-container class="home">
    <v-card class="mb-6 mt-0 transparent" elevation="0" id="phones">
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
    <v-card class="mb-6 mt-0 transparent" elevation="0" id="today">
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
    <v-card class="mb-6 mt-0 transparent" elevation="0" id="total">
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
    <v-card class="mb-6 mt-0" max-height="500" elevation="4" id="vaccine">
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
    <v-card class="mb-6 mt-0 transparent" elevation="0" id="distribution">
      <v-card-title class="text-capitalize">
        {{ $t("distribution of cases") }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="my-2" max-height="500" elevation="4">
              <v-card-title>{{ $t("cases per population") }}</v-card-title>
              <v-card-text>
                <pie-chart-component
                  :chartData="totalCasesPerPopularity"
                  :options="options"
                ></pie-chart-component>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="my-2" max-height="500" elevation="4">
              <v-card-title>
                {{ $t("distribution of cases") }}
              </v-card-title>
              <v-card-text>
                <pie-chart-component
                  :chartData="distributionCasesPerTotal"
                  :options="options"
                ></pie-chart-component>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import StatsCard from "@/components/cards/StatsCard";
import {
  LineChartComponent,
  PieChartComponent,
} from "@/components/general/charts";
import { globalColorsPallette } from "@/plugins/vuetify";

export default {
  name: "Home",
  components: {
    LineChartComponent,
    PieChartComponent,
    StatsCard,
  },
  data: () => ({
    /// api
    apiBaseURL: "https://moroccovid-19-api.herokuapp.com/",
    /// progress & loading
    statsInProgress: true,
    statisticsExpectLength: 0,
    todayStatisticsExpectLength: 0,
    /// data
    importantPhoneNumbers: [],
    statistics: [],
    todayStatistics: [],
    vaccineData: {},
    totalCasesPerPopularity: {},
    distributionCasesPerTotal: {},
    /// for charts
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
          icon: "fa-head-side-mask",
          color: "primary",
          title: this.$t("total cases"),
          value: covid.cases,
        },
        {
          icon: "fa-heartbeat",
          color: "success",
          title: this.$t("total recovered cases"),
          value: covid.recovered,
        },
        {
          icon: "fa-stethoscope",
          color: "secondary",
          title: this.$t("total tests cases"),
          value: covid.tests,
        },
        {
          icon: "fa-head-side-cough",
          color: "warning",
          title: this.$t("active cases"),
          value: covid.active,
        },
        {
          icon: "fa-procedures",
          color: "deep-orange",
          title: this.$t("critical cases"),
          value: covid.critical,
        },
        {
          icon: "fa-bed",
          color: "error",
          title: this.$t("total deaths cases"),
          value: covid.deaths,
        },
      );

      /// today stats
      if (this.isTodayStatsReady) {
        this.todayStatistics.push(
          {
            icon: "fa-head-side-mask",
            color: "primary",
            title: this.$t("today cases"),
            value: covid.todayCases,
          },
          {
            icon: "far fa-heart",
            color: "success",
            title: this.$t("today recovered cases"),
            value: covid.todayRecovered,
          },
          {
            icon: "fa-bed",
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

      // cases per population
      this.totalCasesPerPopularity = {
        labels: [this.$t("total cases"), this.$t("population")],
        datasets: [
          {
            label: this.$t("total cases"),
            backgroundColor: [globalColorsPallette.error, this.backgroundColor],
            data: [covid.cases, covid.population],
          },
        ],
      };

      // distribution of cases
      this.distributionCasesPerTotal = {
        labels: [],
        datasets: [{ backgroundColor: [], data: [] }],
      };
      [1, 3, 4, 5].forEach(n => {
        this.distributionCasesPerTotal.labels.push(this.statistics[n].title);
        this.distributionCasesPerTotal.datasets[0].backgroundColor.push(
          globalColorsPallette[this.statistics[n].color],
        );
        this.distributionCasesPerTotal.datasets[0].data.push(
          this.statistics[n].value,
        );
      });
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
