<template>
  <v-container fluid>
    <v-row class="my-4">
      <v-col cols="8">
        <h4 class="text-uppercase">Report Templates</h4>

        <v-list lines="two" class="my-4">
          <v-list-item
            v-for="(template, index) in templates"
            :key="index"
          >
            <v-list-item-title>{{ template.title }}</v-list-item-title>
            <v-list-item-subtitle v-html="template.description"></v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-btn color="blue" size="small" variant="tonal">
          Add Document
        </v-btn>
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
import { useUserStore } from '@/stores'

// TOOD
// 1. Upload report templates
// 2. View submission by each group

export default {
  name: 'Documentation Management',
  data () {
    return {
      maxProgressReport: 8,
      templates: [
        {
          title: 'PPM Report Template',
          description: '<a href="/docs/1-SOFTWARE_PLANNING.docx" class="text-primary">Click to download 1-SOFTWARE_PLANNING.docx</a> and submit to supervisor.'
        },
        {
          title: 'Final Report Template',
          description: '<a href="/docs/3-SOFTWARE_FINAL.docx" class="text-primary">Click to download 3-SOFTWARE_FINAL.docx</a> and submit to supervisor.'
        },
        {
          title: 'Progress Report Template',
          description: '<a href="/docs/2-SOFTWARE_PROGRESS.docx" class="text-primary">Click to download 2-SOFTWARE_PROGRESS.docx</a> and submit to supervisor.'
        }
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
