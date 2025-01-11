<template>
  <v-tooltip :text="tooltipText" location="top">
    <template v-slot:activator="{ props }">
      <v-btn
        class="mx-1"
        :color="color"
        :icon="icon"
        variant="tonal"
        :size="size"
        v-bind="props"
        @click="$emit('action')"
      ></v-btn>
    </template>
  </v-tooltip>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    tooltipText: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'x-small'
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>
