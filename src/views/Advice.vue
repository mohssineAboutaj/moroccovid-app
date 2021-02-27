<template>
  <v-container>
    <v-card class="transparent">
      <v-card-title class="justify-center text-capitalize mb-2">
        advices
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(img, n) in images"
            :key="n"
            class="d-flex child-flex"
            cols="12"
            md="6"
            xl="4"
          >
            <v-img
              :src="img"
              :lazy-src="img"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    apiURL: "https://moroccovid-19-api.herokuapp.com/",
    images: [],
  }),
  created() {
    this.$axios.get(this.apiURL).then(({ data }) => {
      this.images = data.advice.images;
    });
  },
};
</script>
