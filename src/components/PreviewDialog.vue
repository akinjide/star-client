<template>
  <div class="pa-4 text-center">
    <v-dialog
      :model-value="view"
      max-width="600"
      persistent
    >
      <v-card
        :prepend-icon="header.icon"
        :title="header.title"
      >
        <v-card-text>
          <p class="text-h6 font-weight-black">{{ body.name }}</p>

          <div class="text-medium-emphasis">
            {{ body.text }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="body.url"
            color="orange"
            text="Preview"
            :href="body.url"
            target="_blank"
          ></v-btn>

          <v-btn @click="close(!view)" text="Ok"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'PreviewDialog',
  props: {
    view: {
      type: Boolean,
      required: true
    },
    header: {
      type: Object,
      required: true
    },
    body: {
      type: Object,
      required: true
    }
  },
  methods: {
    close (value) {
      this.$emit('close', value)
    }
  }
}
</script>
