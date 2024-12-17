<template>
  <v-container fluid>
    <v-row
      class="flex-nowrap flex-column justify-space-between"
      no-gutters
    >
      <v-col cols="12" style="min-height: 620px; max-height: 620px; overflow-y: scroll;">
        <v-list
          :items="messages"
          lines="three"
          item-props
        >
          <template v-slot:subtitle="{ subtitle }">
            <div>
              <p class="text-caption">{{ timeAgo(subtitle.created_at) }}</p>

              <v-chip size="large" class="py-2 px-4 rounded-ts-sm" variant="flat" :color="subtitle.color">
                <div v-html="subtitle.message"></div>
              </v-chip>
            </div>
          </template>
        </v-list>
      </v-col>

      <v-col cols="12">
        <v-card elevation="2" class="pa-6 mt-2">
          <div class="d-flex align-center mb-4">
            <v-avatar :image="user.image"></v-avatar>
            <h4 class="mx-4">{{ user.full_name }}</h4>
          </div>

          <v-textarea
            label="What to speak with EMU Graduating students of 2025?"
            variant="outlined"
            v-model="message"
          ></v-textarea>
          <v-btn variant="tonal" color="purple" @click="create(message)">
            Send community note
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useTimeAgo } from '@vueuse/core'

export default {
  name: 'Community',
  data () {
    return {
      message: ''
    }
  },
  components: {},
  methods: {
    ...mapActions(useUserStore, ['getMessages']),
    ...mapActions(useUserStore, ['createMessage']),
    timeAgo (t) {
      return useTimeAgo(t)
    },
    async create (message) {
      const response = await this.createMessage(message)

      if (response) {
        this.dialog = false
        this.$router.go(this.$router.currentRoute)
      }
    }
  },
  async created () {
    await this.getMessages()
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useUserStore, ['messages'])
  }
}
</script>

<style scoped>
.v-main {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.v-container {
  max-width: 100%;
  padding: 0;
}
</style>
