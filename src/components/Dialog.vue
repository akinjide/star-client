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
          <v-row dense>
            <v-col
              v-for="(field, index) in fields"
              :key="index"
              :cols="field.col"
              :md="field.col"
              :sm="field.col"
            >
              <v-text-field
                v-if="field.type === 'text-field'"
                :label="field.label"
                :model-value="field.model"
                :required="field.required"
              ></v-text-field>

              <v-textarea
                v-if="field.type === 'textarea'"
                :label="field.label"
                :model-value="field.model"
              ></v-textarea>

              <v-file-input
                v-if="field.type === 'file-input'"
                :accept="field.accept"
                :label="field.label"
                :placeholder="field.placeholder"
                :prepend-icon="field.icon"
                :model-value="field.model"
                :loading="field.loading"
                :required="field.required"
              ></v-file-input>

              <v-select
                v-if="field.type === 'select'"
                :label="field.label"
                :items="field.items"
                :item-title="field.item.title"
                :item-value="field.item.value"
                :model-value="field.model"
                :required="field.required"
                :multiple="field.multiple"
                :clearable="field.clearable"
                :chips="field.chips"
              ></v-select>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="close(!view)"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="save(fields)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    view: {
      type: Boolean,
      required: true
    },
    header: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  methods: {
    close (value) {
      this.$emit('close', value)
    },
    save (value) {
      this.$emit('save', value)
    }
  }
}
</script>
