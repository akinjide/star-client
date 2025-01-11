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
            <v-text-field :label="body.label" hide-details="true" v-model="value"></v-text-field>
          </div>

        </v-card-text>

        <v-card-actions>
          <v-btn @click="close(!view)" text="Cancel"></v-btn>
          <v-btn color="green" @click="confirm()" text="Confirm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'InputDialog',
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
  data () {
    return {
      value: ''
    }
  },
  methods: {
    close (value) {
      this.$emit('close', value)
    },
    confirm () {
      this.$emit('confirm', this.value)
    }
  }
}
</script>
