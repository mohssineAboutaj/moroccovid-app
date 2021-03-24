<template>
  <v-footer :fixed="fixed" app color="primary" dark class="caption">
    <v-row class="text-capitalize text-center">
      <v-col cols="6">
        <v-icon primary class="mr-2">far fa-copyright</v-icon>
        {{ new Date().getFullYear() }} - {{ title }}
      </v-col>
      <v-col cols="6">
        {{ $t("Created by") }} <b>{{ author }}</b>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { footer } from "@/mixins";

export default {
  mixins: [footer],
};
</script>
