<template>
  <v-container fluid>
    <v-row class="my-4">
      <v-col cols="8">
        <h4 class="text-uppercase">Report Templates</h4>

        <v-list lines="two">
          <v-list-item
            v-for="(template, index) in templates"
            :key="index"
          >
            <v-list-item-title>{{ template.title }}</v-list-item-title>
            <v-list-item-subtitle v-html="template.description"></v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <h4 class="text-uppercase">Submissions</h4>

        <v-table
          class="my-4"
        >
          <tbody>
            <tr
              v-for="(submission, index) in dedupeSubmissions"
              :key="index"
            >
              <td>{{ submission.name }}</td>
              <td>
                <v-icon v-if="submission.name !== 'Progress Report'" color="success" size="large" icon="mdi-checkbox-marked-circle"></v-icon>
                <v-progress-linear
                  :model-value="progressReport"
                  v-if="submission.name === 'Progress Report'"
                  color="green"
                  height="25"
                  rounded
                  :max="maxProgressReport"
                >
                  <strong>{{ Math.ceil(progressReport) }} / {{ maxProgressReport }}</strong>
                </v-progress-linear>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'Report',
  data () {
    return {
      maxProgressReport: 8,
      templates: [
        { title: 'PPM Report Template', description: '<a href="google.com" class="text-primary">to Alex, Scott, Jennifer</a> &mdash; Wish I could come, but I\'m out of town this weekend.' },
        { title: 'Final Report Template', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit' },
        { title: 'Progress Report Template', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit' }
      ],
      submissions: [
        { name: 'PPM Report', added_at: '2024-11-04T21:16:22.431Z', url: '' },
        { name: 'Final Report', added_at: '2024-11-04T21:16:22.431Z', url: '' },
        { name: 'Progress Report', added_at: '2024-11-04T21:16:22.431Z', url: '', version: 1 },
        { name: 'Progress Report', added_at: '2024-11-04T21:16:22.431Z', url: '', version: 2 },
        { name: 'Progress Report', added_at: '2024-11-04T21:16:22.431Z', url: '', version: 3 }
      ]
    }
  },
  components: {},
  methods: {
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    progressReport () {
      if (this.submissions.length) {
        const progressReports = this.submissions.filter((submission) => {
          if (submission.name === 'Progress Report') {
            return true
          }

          return false
        })

        return progressReports.length
      }

      return 0
    },
    dedupeSubmissions () {
      const q = []
      const dedupeSubmissions = []

      if (this.submissions.length) {
        for (const submission of this.submissions) {
          if (!q.includes(submission.name)) {
            q.push(submission.name)
            dedupeSubmissions.push(submission)
          }
        }
      }

      return dedupeSubmissions
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
