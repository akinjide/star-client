<template>
  <v-container fluid>
    <v-row class="flex-nowrap flex-column justify-space-between" no-gutters>
      <v-col cols="12" style="min-height: 620px; max-height: 620px; overflow-y: scroll;">
        <v-list lines="two">
          <v-list-item
            v-for="(message, index) in parsedMessages"
            :key="index"
            :prependAvatar="message.avatar"
          >
            <div>
              <div class="flex-row d-flex align-end">
                <v-list-item-title class="font-weight-medium">
                  <v-chip :color="message.subtitle.color" variant="tonal" label size="small">
                    {{ message.title }}
                  </v-chip>
                </v-list-item-title>

                <v-list-item-subtitle class="px-2 text-caption">
                  {{ $timeAgo(message.subtitle.created_at) }}
                </v-list-item-subtitle>
              </div>

              <div class="pt-2">
                <p>{{ message.subtitle.text }}</p>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12">
        <v-card elevation="2" class="pa-6 mt-2">
          <div class="d-flex align-center mb-4">
            <v-avatar :image="getImage(user.image)"></v-avatar>
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
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Community',
  data () {
    return {
      message: ''
    }
  },
  components: {},
  methods: {
    ...mapActions(useMainStore, ['getMessages']),
    ...mapActions(useMainStore, ['createMessage']),
    async create (message) {
      const { errorMessage } = await this.createMessage(message)

      if (!errorMessage) {
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
    ...mapState(useMainStore, ['messages']),
    ...mapState(useMainStore, ['getImage']),
    parsedMessages () {
      if (this.messages && this.messages.length) {
        return this.messages.map((message) => {
          return {
            ...message,
            avatar: this.getImage(message.avatar)
          }
        })
      }

      return []
    }
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
