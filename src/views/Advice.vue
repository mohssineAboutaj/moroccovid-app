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
            md="4"
            xl="3"
          >
            <v-img
              @click="setCurrentImg(img)"
              :src="img"
              :lazy-src="img"
              aspect-ratio="1"
              class="primary"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-spacer></v-spacer>
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-img :src="imgToShow"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    imgToShow: "",
    apiURL: "https://moroccovid-19-api.herokuapp.com/",
    images: [],
  }),
  beforeMount() {
    this.$axios.get(this.apiURL).then(({ data }) => {
      this.images = data.advice.images;
      this.imgToShow = this.images[0];
    });
  },
  methods: {
    setCurrentImg(src) {
      this.imgToShow = src;
      this.dialog = !this.dialog;
    },
  },
};
</script>
