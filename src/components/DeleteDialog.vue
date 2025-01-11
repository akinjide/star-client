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
          <p class="text-h6 font-weight-black">Delete {{ body.name }}</p>

          <div class="text-medium-emphasis">
            {{ body.text }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="close(!view)" text="Cancel"></v-btn>
          <v-btn color="red" @click="confirm(true)" text="Confirm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    view: {
      type: Boolean,
      required: true
    },
    header: {
      type: Object,
      required: false,
      default: () => ({
        icon: 'mdi-delete-alert-outline',
        title: 'Confirm Delete'
      })
    },
    body: {
      type: Object,
      required: false,
      default: () => ({
        name: '',
        text: 'Are you sure you want to proceed?'
      })
    }
  },
  methods: {
    close (value) {
      this.$emit('close', value)
    },
    confirm (value) {
      this.$emit('confirm', value)
    }
  }
}
</script>
