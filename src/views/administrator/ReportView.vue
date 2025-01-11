<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h4 class="text-uppercase">Report Templates</h4>

        <v-list lines="one">
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
        <h4 class="text-uppercase mb-4">Report Submissions</h4>

        <v-card
          v-for="(team, index) in resultQuery"
          :key="index"
          elevation="4"
          class="pa-4 mb-6">
          <v-card-title>{{ team.name }} Report Submissions</v-card-title>
          <v-card-subtitle>{{ getTeamSupervisor(team) }}</v-card-subtitle>

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
                v-for="(submission, index) in teamReport(team.id)"
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
                      v-if="isSubmitted(submission)"
                      tooltipText="View Report"
                      color="blue-grey"
                      icon="mdi-file-eye-outline"
                      @action="select(submission, 'view_report')"
                    ></IconButton>

                    <IconButton
                      v-if="isSubmitted(submission) && isReportURL(submission)"
                      tooltipText="Download Report"
                      color="orange"
                      icon="mdi-file-download-outline"
                      @action="select(submission, 'download_report')"
                    ></IconButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <PreviewDialog
    :view="viewReport"
    :header="{
      icon: 'mdi-information',
      title: 'Report Information'
    }"
    :body="{
      name: report.report_name,
      text: report.report_text,
      url: getDocument(report.report_url)
    }"
    @close="viewReport = false"
  />
</template>

<script>
import { mapState, mapActions } from 'pinia'

import IconButton from '@/components/IconButton'
import PreviewDialog from '@/components/PreviewDialog'
import { useUserStore, useMainStore } from '@/stores'
import api from '@/api'

export default {
  name: 'Report',
  data () {
    return {
      searchQuery: null,
      progress: false,
      viewReport: false,
      addReportDialog: false,
      maxProgressReport: 8,
      report: {},
      reportsName: [
        'PPM Report',
        'Final Report',
        'Progress Report'
      ],
      templates: [
        {
          title: 'PPM Report Template',
          description: '<a href="/docs/1-SOFTWARE_PLANNING.docx" class="text-primary">Click to download 1-SOFTWARE_PLANNING.docx</a>'
        },
        {
          title: 'Final Report Template',
          description: '<a href="/docs/3-SOFTWARE_FINAL.docx" class="text-primary">Click to download 3-SOFTWARE_FINAL.docx</a>'
        },
        {
          title: 'Progress Report Template',
          description: '<a href="/docs/2-SOFTWARE_PROGRESS.docx" class="text-primary">Click to download 2-SOFTWARE_PROGRESS.docx</a>'
        }
      ],
      submissions: []
    }
  },
  components: {
    IconButton,
    PreviewDialog
  },
  methods: {
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getTeamBySupervisor']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['getReports']),
    ...mapActions(useMainStore, ['getProjectReports']),
    ...mapActions(useMainStore, ['getProjectByTeam']),
    async select (record, action) {
      if (action === 'add_report') {
        this.progressReportCount = 0
        this.addReportDialog = true
        this.report = {
          ...record,
          action: action
        }
      }

      if (action === 'view_report') {
        this.report = record
        this.viewReport = true
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
          console.log(Math.round((100 * event.loaded) / event.total))
        })

        this.progress = false
        const { data: { path } } = response.data

        record.url = path
      }

      if (record.action === 'add_report') {
        let version = 1

        if (record.name === this.reportsName[2]) {
          version = this.computeDedupe(this.projectReports)
        }

        const response = await api.reports.create({
          ...record,
          project_id: this.project.project_id,
          version: version
        })

        if (response && response.data) {
          console.log(response.data)
          this.addReportDialog = false
          this.$router.go(this.$router.currentRoute)
        }
      }
    },
    async remove (report) {
      const response = await this.deleteReport(report.report_id)
      console.log(response)
      this.$router.go(this.$router.currentRoute)
    },
    isProgressReport (submission) {
      return submission && submission.report_name === this.reportsName[3]
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
          if (submission.report_name === this.reportsName[2]) {
            progressReportCount++
          }
        }
      }

      return progressReportCount
    },
    teamReport (teamId) {
      const teamReport = []

      if (this.reports && this.reports.length) {
        for (const report of this.reports) {
          if (report.team_id === teamId) {
            teamReport.push(report)
          }
        }
      }

      return teamReport
    },
    getTeamSupervisor (team) {
      if (team.supervisor_full_name) {
        return team.supervisor_title + ' ' + team.supervisor_full_name
      }

      return 'No supervisor assigned yet'
    }
  },
  async created () {
    await this.getTeams()
    await this.getProjects()
    await this.getReports()
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['teams']),
    ...mapState(useMainStore, ['project']),
    ...mapState(useMainStore, ['reports']),
    ...mapState(useMainStore, ['projectReports']),
    ...mapState(useMainStore, ['deleteReport']),
    ...mapState(useMainStore, ['getDocument']),
    reportProgress () {
      if (this.projectReports && this.projectReports.length) {
        const progressReports = this.dedupeSubmissions.filter((submission) => {
          if (submission.report_name === this.reportsName[2]) {
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

        for (const report of this.reportsName) {
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
          if (submission.report_name === this.reportsName[2]) {
            progressReportCount++
          }

          dedupeSubmissions.push(submission.report_name)
        }

        for (const report of this.reportsName) {
          if (!q.includes(report) && report === this.reportsName[2] && progressReportCount < this.maxProgressReport) {
            q.push(report)
          }

          if (!dedupeSubmissions.includes(report)) {
            q.push(report)
          }
        }
      }

      return q
    },
    resultQuery () {
      if (this.searchQuery) {
        return this.teams.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every((v) => {
            if (item.name.toLowerCase().includes(v)) {
              return true
            }

            if (item.supervisor_full_name.toLowerCase().includes(v)) {
              return true
            }

            return false
          })
        })
      } else {
        return this.teams
      }
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
