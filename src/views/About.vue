<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center text-capitalize mb-2">
        {{ $t("about") }}
      </v-card-title>
      <v-img contain height="auto" :src="require('@/assets/about.jpg')"></v-img>
      <v-card-text class="headline">
        {{ $t("app description") }}
      </v-card-text>
    </v-card>
  </v-container>
</template>
