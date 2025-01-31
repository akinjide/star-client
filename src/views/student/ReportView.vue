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
        <h4 class="text-uppercase">Report Submissions</h4>

        <div class="d-flex my-2 justify-space-between align-end">
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

          <div class="mx-2"></div>

          <div>
            <IconButton
              tooltipText="Add Report"
              color="blue"
              size="small"
              icon="mdi-file-plus-outline"
              @action="select({}, 'add_report')"
            ></IconButton>
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
                  v-if="isSubmitted(submission)"
                  color="success"
                  icon="mdi-checkbox-marked-circle"
                ></v-icon>

                <v-icon
                  v-if="!isSubmitted(submission)"
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

  <!-- DIALOG -->
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog.add_report"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="Add Report"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-select
                label="Name*"
                :items="unsubmittedReports"
                v-model="report.name"
                :rules="ruleMinMax('Name', 10, 50)"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-file-input
                accept=".doc, .docx, .ppt, .pptx, .txt, .pdf"
                label="File*"
                placeholder="Pick a file (.doc, .docx, .ppt, .pptx,.txt or .pdf)"
                v-model="report.file"
                :loading="progress"
                :rules="ruleRequired('File')"
                required
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea
                label="(Optional) Text"
                v-model="report.raw_text"
              ></v-textarea>
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
            @click="dialog.add_report = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="upsert(report)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

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
</template>

<script>
import { mapState, mapActions } from 'pinia'

import IconButton from '@/components/IconButton'
import PreviewDialog from '@/components/PreviewDialog'
import { useMainStore } from '@/stores'
import { REPORT_TYPES, TEMPLATES, MAX_PROGRESS_REPORT } from '@/stores/constants'
import api from '@/api'

export default {
  name: 'Report',
  data () {
    return {
      progress: false,
      dialog: {
        add_report: false,
        view_report: false,
        view_comment: false
      },
      maxProgressReport: MAX_PROGRESS_REPORT,
      report: {}
    }
  },
  components: {
    IconButton,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getReports']),
    ...mapActions(useMainStore, ['deleteReport']),
    ...mapActions(useMainStore, ['ruleRequired']),
    ...mapActions(useMainStore, ['ruleMinMax']),
    async select (record, action) {
      if (action === 'add_report') {
        this.progressReportCount = 0
        this.dialog.add_report = true
        this.report = {
          ...record,
          action: action
        }
      }

      if (action === 'view_report') {
        this.report = record
        this.dialog.view_report = true
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
    async upsert (record) {
      if (record.file) {
        const response = await api.upload.create(record.file, 'documents', event => {
          this.progress = true
        })

        this.progress = false
        const { data: { path } } = response.data

        record.url = path
      }

      if (record.action === 'add_report') {
        let version = 1

        if (record.name === REPORT_TYPES[2]) {
          version = this.computeDedupe(this.projectReports)
        }

        const response = await api.reports.create({
          ...record,
          project_id: this.project.project_id,
          version: version
        })

        if (response && response.data) {
          this.addReportDialog = false
          this.$router.go(this.$router.currentRoute)
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
  computed: {
    ...mapState(useMainStore, ['project']),
    ...mapState(useMainStore, ['projectReports']),
    ...mapState(useMainStore, ['getDocument']),
    reportProgress () {
      if (this.projectReports && this.projectReports.length) {
        const progressReports = this.dedupeSubmissions.filter((submission) => {
          if (this.isProgressReport(submission)) {
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
      const submissions = this.projectReports

      if (submissions && submissions.length) {
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
      let q = []
      const dedupeSubmissions = []
      const submissions = this.projectReports
      let progressReportCount = 0

      if (submissions && submissions.length) {
        for (const submission of submissions) {
          if (this.isProgressReport(submission)) {
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
      } else {
        q = REPORT_TYPES
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
