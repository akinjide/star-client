<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
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
      <v-col cols="12">
        <h4 class="text-uppercase">{{ team.name }} Report Submissions</h4>

        <div class="d-flex my-2 justify-space-between align-center">
          <div>
            <div class="mb-2">
              <h5 class="text-uppercase">Progress Report</h5>
            </div>

            <v-sheet
              class="d-flex align-center px-4"
              color="#181a1b"
              min-width="500"
              rounded="lg"
            >
              <v-progress-linear
                :location="null"
                buffer-opacity="1"
                :buffer-value="reportProgress"
                color="green"
                height="12"
                :max="maxProgressReport"
                min="0"
                model-value="reportProgress"
                rounded
              ></v-progress-linear>

              <div class="ms-4 text-h6">{{ Math.ceil(reportProgress) }}/{{ maxProgressReport }}</div>
            </v-sheet>
          </div>
        </div>

        <v-table
          class="my-4"
        >
          <thead>
            <tr>
              <th class="text-left text-uppercase">Report Name</th>
              <th class="text-left text-uppercase">Version</th>
              <th class="text-left text-uppercase">Added</th>
              <th class="text-left text-uppercase">Status</th>
              <th class="text-left text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(submission, index) in dedupeSubmissions"
              :key="index"
            >
              <td>{{ submission.report_name }}</td>
              <td>{{ submission.report_version }}</td>
              <td>{{ $parseDateTime(submission.report_added_at) }}</td>
              <td>
                <v-icon
                  v-if="!isProgressReport(submission) && isSubmitted(submission)"
                  color="success"
                  icon="mdi-checkbox-marked-circle"
                ></v-icon>

                <v-icon
                  v-if="!isProgressReport(submission) && !isSubmitted(submission)"
                  color="warning"
                  icon="mdi-clock-outline"
                ></v-icon>
              </td>
              <td>
                <div class="d-flex">
                  <IconButton
                    v-if="isSubmitted(submission)"
                    tooltipText="Remove Report"
                    color="red"
                    icon="mdi-file-remove-outline"
                    @action="remove(submission)"
                  ></IconButton>

                  <IconButton
                    tooltipText="Add Comment"
                    color="orange"
                    icon="mdi-comment-edit-outline"
                    @action="select(submission, 'add_comment')"
                    v-if="!submission.report_comment"
                  ></IconButton>

                  <IconButton
                    v-if="isSubmitted(submission) && isReportURL(submission)"
                    tooltipText="Download Report"
                    color="orange"
                    icon="mdi-file-download-outline"
                    @action="select(submission, 'download_report')"
                  ></IconButton>

                  <IconButton
                    v-if="isSubmitted(submission) && submission.report_comment"
                    tooltipText="View Comment"
                    color="blue-grey"
                    icon="mdi-comment-eye-outline"
                    @action="select(submission, 'view_comment')"
                  ></IconButton>

                  <IconButton
                    v-if="isSubmitted(submission)"
                    tooltipText="View Report"
                    color="blue-grey"
                    icon="mdi-file-eye-outline"
                    @action="select(submission, 'view_report')"
                  ></IconButton>

                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>

  <!-- DIALOG(s) -->
  <PreviewDialog
    :view="dialog.view_report"
    :header="{
      icon: 'mdi-information',
      title: 'Report Information'
    }"
    :body="{
      name: report.report_name,
      text: report.report_text,
      url: getDocument(report.report_url)
    }"
    @close="dialog.view_report = false"
  />

  <PreviewDialog
    :view="dialog.view_comment"
    :header="{
      icon: 'mdi-comment-text',
      title: 'Comment'
    }"
    :body="{
      name: report.report_name,
      text: report.report_comment ? report.report_comment : 'No comment :)'
    }"
    @close="dialog.view_comment = false"
  />

  <InputDialog
    :view="dialog.add_comment"
    :header="{
      icon: 'mdi-comment-edit',
      title: 'Comment'
    }"
    :body="{
      name: '',
      label: 'Leave comment'
    }"
    @close="dialog.add_comment = false"
    @confirm="comment"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'

import IconButton from '@/components/IconButton'
import InputDialog from '@/components/InputDialog'
import PreviewDialog from '@/components/PreviewDialog'
import { useUserStore, useMainStore } from '@/stores'
import { REPORT_TYPES, TEMPLATES } from '@/stores/constants'

export default {
  name: 'Report',
  data () {
    return {
      dialog: {
        add_comment: false,
        view_comment: false,
        view_report: false
      },
      progress: false,
      maxProgressReport: 8,
      report: {},
      submissions: []
    }
  },
  components: {
    IconButton,
    InputDialog,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getTeamBySupervisor']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['getReports']),
    ...mapActions(useMainStore, ['updateReport']),
    ...mapActions(useMainStore, ['getProjectReports']),
    ...mapActions(useMainStore, ['getProjectByTeam']),
    ...mapActions(useMainStore, ['ruleRequired']),
    ...mapActions(useMainStore, ['ruleMinMax']),
    async select (record, action) {
      if (action === 'view_report') {
        this.report = record
        this.dialog.view_report = true
      }

      if (action === 'add_comment') {
        this.report = record
        this.dialog.add_comment = true
      }

      if (action === 'view_comment') {
        this.report = record
        this.dialog.view_comment = true
      }

      if (action === 'download_report') {
        if (record.report_url) {
          window.open(this.getDocument(record.report_url))
        }
      }
    },
    async remove (report) {
      const { errorMessage } = await this.deleteReport(report.report_id)

      if (!errorMessage) {
        this.$router.go(this.$router.currentRoute)
      }
    },
    isProgressReport (submission) {
      return submission && submission.report_name === REPORT_TYPES[2]
    },
    isReportURL (submission) {
      return submission && submission.report_url && submission.report_url.length
    },
    isReportText (submission) {
      return submission && submission.report_text && submission.report_text.length
    },
    isSubmitted (submission) {
      return this.isReportText(submission) || this.isReportURL(submission)
    },
    async comment (value) {
      const { errorMessage } = await this.updateReport(this.report.report_id, {
        comment: value
      })

      if (!errorMessage) {
        this.dialog.add_comment = false
        this.$router.go(this.$router.currentRoute)
      }
    },
    computeDedupe (submissions) {
      let progressReportCount = 1

      if (submissions && submissions.length) {
        for (const submission of submissions) {
          if (submission.report_name === REPORT_TYPES[2]) {
            progressReportCount++
          }
        }
      }

      return progressReportCount
    }
  },
  async created () {
    await this.getTeams()
    await this.getProjects()
    const team = await this.getTeamBySupervisor(this.user.id)

    if (team && Object.keys(team).length) {
      const project = await this.getProjectByTeam(team.id)
      await this.getProjectReports(project.project_id)
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['team']),
    ...mapState(useMainStore, ['project']),
    ...mapState(useMainStore, ['reports']),
    ...mapState(useMainStore, ['projectReports']),
    ...mapState(useMainStore, ['deleteReport']),
    ...mapState(useMainStore, ['getDocument']),
    reportProgress () {
      if (this.projectReports && this.projectReports.length) {
        const progressReports = this.dedupeSubmissions.filter((submission) => {
          if (submission.report_name === REPORT_TYPES[2]) {
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
      let submissions = this.submissions

      if (this.projectReports && this.projectReports.length) {
        submissions = submissions.concat(this.projectReports)

        for (const submission of submissions) {
          // if (!q.includes(submission.name)) {
          q.push(submission.report_name)
          dedupeSubmissions.push(submission)
          // }
        }

        for (const report of REPORT_TYPES) {
          if (!q.includes(report)) {
            dedupeSubmissions.push({
              report_name: report
            })
          }
        }
      }

      return dedupeSubmissions
    },
    unsubmittedReports () {
      const q = []
      const dedupeSubmissions = []
      let submissions = this.submissions
      let progressReportCount = 0

      if (this.projectReports && this.projectReports.length) {
        submissions = submissions.concat(this.projectReports)

        for (const submission of submissions) {
          if (submission.report_name === REPORT_TYPES[2]) {
            progressReportCount++
          }

          dedupeSubmissions.push(submission.report_name)
        }

        for (const report of REPORT_TYPES) {
          if (!q.includes(report) && report === REPORT_TYPES[2] && progressReportCount < this.maxProgressReport) {
            q.push(report)
          }

          if (!dedupeSubmissions.includes(report)) {
            q.push(report)
          }
        }
      }

      return q
    },
    templates () {
      return TEMPLATES
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
