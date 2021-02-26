<template>
  <v-card :class="`elevation-${elevation}`" class="px-6 py-4">
    <v-row>
      <v-col
        cols="4"
        :class="[color, 'text-center', `elevation-${elevation}`, 'rounded-lg']"
        :style="`margin-top:-${iconMargin}rem;margin-bottom:${iconMargin}rem`"
      >
        <v-icon size="40" class="my-4" dark>{{ icon }}</v-icon>
      </v-col>
      <v-col cols="8" class="text-right">
        <h4 class="caption text-capitalize">{{ title }}</h4>
        <h4 class="headline text-capitalize">{{ value }}</h4>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    iconMargin: 1,
  }),
  props: {
    color: {
      type: String,
      required: false,
      default: "primary",
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    elevation: {
      type: Number,
      default: 0,
    },
  },
};
</script>
