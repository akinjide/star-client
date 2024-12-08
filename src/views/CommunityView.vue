<template>
  <v-container fluid>
    <v-row
      class="flex-nowrap flex-column justify-space-between"
      no-gutters
    >
      <v-col cols="12" style="max-height: 620px; overflow-y: scroll;">
        <v-list
          :items="items"
          lines="three"
          item-props
        >
          <template v-slot:subtitle="{ subtitle }">
            <div>
              <p class="text-caption">{{ timeAgo(subtitle.created_at) }}</p>

              <v-chip size="large" class="my-2 pa-6 rounded-ts-sm">
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

          <v-textarea label="What to speak with EMU Graduating students of 2025?" variant="outlined"></v-textarea>
          <v-btn variant="tonal" color="purple">
            Send community note
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useTimeAgo } from '@vueuse/core'

export default {
  name: 'Community',
  data () {
    return {
      items: [
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'You',
          subtitle: {
            created_at: '2024-06-20T21:45:08.979Z',
            message: '<span class="text-primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
          }
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Akinjide',
          subtitle: {
            created_at: '2024-06-24T21:45:08.979Z',
            message: '<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.'
          }
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Anthoniy',
          subtitle: {
            created_at: '2024-06-28T21:45:08.979Z',
            message: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
          }
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Hind',
          subtitle: {
            created_at: '2024-07-24T21:45:08.979Z',
            message: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
          }
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Omer',
          subtitle: {
            created_at: '2024-08-14T21:45:08.979Z',
            message: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
          }
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Omer',
          subtitle: {
            created_at: '2024-08-24T21:45:08.979Z',
            message: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
          }
        },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'You',
          subtitle: {
            created_at: '2024-12-07T18:30:08.979Z',
            message: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
          }
        }
      ]
    }
  },
  components: {},
  methods: {
    timeAgo (t) {
      return useTimeAgo(t)
    }
  },
  computed: {
    ...mapState(useUserStore, ['user'])
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
