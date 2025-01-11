<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <IconButton
          tooltipText="Generate PDF"
          color="blue-grey"
          size="small"
          icon="mdi-printer"
          @action="generatePDF()"
        ></IconButton>
      </v-col>
    </v-row>

    <div id="team-evaluation">
      <v-row id="te-h">
        <v-col cols="12">
          <v-card
            elevation="4"
            class="pa-8 my-1">
            <div class="pl-4 pb-4">
              <p class="font-weight-bold">Evaluation form using rubrics for Software Engineering Undergraduate</p>
            </div>

            <v-table
              min-height="500px"
              fixed-header
              density="comfortable"
            >
              <tbody>
                <tr>
                  <td class="text-left">Student Name:</td>
                  <td class="text-end">{{ teamLead.full_name }}</td>
                </tr>

                <tr>
                  <td class="text-left">Student No:</td>
                  <td class="text-end">{{ teamLead.student_number }}</td>
                </tr>

                <tr>
                  <td class="text-left">Teammates:</td>
                  <td class="text-end">{{ teamMembers }}</td>
                </tr>

                <tr>
                  <td class="text-left">Course Code:</td>
                  <td class="text-end">{{ project.project_course_code }}</td>
                </tr>

                <tr>
                  <td class="text-left">Year-Semester:</td>
                  <td class="text-end">{{ project.project_year }}-{{ project.project_semester }}</td>
                </tr>

                <tr>
                  <td class="text-left">Project Title:</td>
                  <td class="text-end">{{ project.project_name }}</td>
                </tr>

                <tr>
                  <td class="text-left">Date of Presentation:</td>
                  <td class="text-end">{{ $parseDateTime(project.project_presentation_at) }}</td>
                </tr>

                <tr>
                  <td class="text-left">Evaluator: (Name & Signature)</td>
                  <td class="text-end">{{ getUser(summary.evaluator_id) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row id="te-m">
        <v-col cols="12">
          <v-card
            elevation="4"
            class="pa-8 my-1"
            v-if="Object.keys(evaluationWithoutSummary).length">
            <div
              class="my-8"
              v-for="(ev, key, i) in evaluationWithoutSummary"
              :key="key"
              :id="'te-m-' + i">
              <div class="pl-4">
                <p class="font-weight-bold">{{ romIndex[i]}}. {{ key }} ({{ sectionPercentage(key) }}%)</p>
              </div>

              <v-table
                min-height="500px"
                fixed-header
                density="comfortable"
              >
                <thead>
                  <tr>
                    <th class="text-start"></th>
                    <th class="text-end">Score</th>
                    <th class="text-end">Weight</th>
                    <th class="text-end">Score x Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, j) in ev.rows"
                    :key="j"
                  >
                    <td class="text-start">{{ row.name }}</td>
                    <td class="text-end">{{ row.score }}</td>
                    <td class="text-end">{{ row.rubrics_criterion_weight }}</td>
                    <td class="text-end">{{ row.score_weight }}</td>
                  </tr>

                  <tr>
                    <td class="font-weight-medium">Total</td>
                    <td></td>
                    <td></td>
                    <td class="text-end font-weight-medium">{{ ev.total }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card>

          <v-card
            elevation="4"
            class="pa-4 my-2"
            v-if="!Object.keys(evaluationWithoutSummary).length">
            <h6 class="text-h6 pa-6">Pending Evaluation</h6>
          </v-card>
        </v-col>
      </v-row>

      <v-row id="te-s">
        <v-col cols="12">
          <v-card
            elevation="4"
            class="pa-8 my-1">
            <div class="pl-4 pb-4">
              <p class="font-weight-bold">Grade Summary</p>
            </div>

            <v-table
              min-height="500px"
              fixed-header
              density="comfortable"
            >
              <tbody>
                <tr>
                  <td class="text-left">I. Report</td>
                  <td class="text-end">{{ evaluationTotal('Report') }}</td>
                </tr>
                <tr>
                  <td class="text-left">II. Cooperation </td>
                  <td class="text-end">{{ evaluationTotal('Cooperation with the supervisor') }}</td>
                </tr>
                <tr>
                  <td class="text-left">III. Quality/Contribution </td>
                  <td class="text-end">{{ evaluationTotal('Quality and contribution of the project') }}</td>
                </tr>
                <tr>
                  <td class="text-left">IV. Presentation</td>
                  <td class="text-end">{{ evaluationTotal('Presentation') }}</td>
                </tr>
                <tr>
                  <td class="text-left">(G) Total (out of 400)</td>
                  <td class="text-end">{{ summary.g_total }}</td>
                </tr>
                <tr>
                  <td class="text-left">(T) Total (G / 4, out of 100)</td>
                  <td class="text-end">{{ summary.t_o }}</td>
                </tr>
                <tr>
                  <td class="text-left">(O) Originality (Absence of plagiarism)1</td>
                  <td class="text-end">{{ summary.originality }}</td>
                </tr>
                <tr>
                  <td class="text-left">Final grade (T x O)</td>
                  <td class="text-end">{{ summary.t_total }}</td>
                </tr>
              </tbody>
            </v-table>

            <div class="mt-4">
              <p class="text-caption">1 Originality is the degree to which the students did the work themselves. 100% means they did all of it themselves. 60% means 40% of the work was done by others. 0% means the whole project is a copy of an existing project done by others.</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import html2pdf from 'html2pdf.js'
import { mapState, mapActions } from 'pinia'

import IconButton from '@/components/IconButton'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Team Evaluation Management',
  data () {
    return {
      searchQuery: null,
      romIndex: ['I', 'II', 'III', 'IV'],
      teamId: null
    }
  },
  components: {
    IconButton
  },
  methods: {
    ...mapActions(useMainStore, ['getEvaluation']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['getTeam']),
    ...mapActions(useMainStore, ['getTeams']),
    ...mapActions(useMainStore, ['getUsers']),
    ...mapActions(useMainStore, ['getProjectByTeam']),
    evaluationTotal (name) {
      if (this.evaluation && Object.keys(this.evaluation).length && this.evaluation[name]) {
        return this.evaluation[name].total
      }

      return 0
    },
    sectionPercentage (name) {
      if (this.evaluation && Object.keys(this.evaluation).length) {
        return this.evaluation[name].section_percentage
      }

      return 0
    },
    generatePDF () {
      const filename = this.project.project_name.split(' ').join('_')

      html2pdf(document.getElementById('team-evaluation'), {
        margin: [3, 5, 5, 3],
        filename: filename + '_evaluation_report.pdf',
        pagebreak: {
          after: [
            '#te-h',
            '#te-m',
            '#te-m-0',
            '#te-s'
          ]
        }
      })
    }
  },
  async created () {
    const teamId = this.$route.params.team_id

    await this.getUsers()
    await this.getTeams()
    await this.getProjects()

    if (teamId) {
      this.teamId = Number(teamId)

      await this.getTeam(this.teamId)
      const { project_id: projectId = null } = await this.getProjectByTeam(this.teamId)
      await this.getEvaluation(projectId)
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['project']),
    ...mapState(useMainStore, ['team']),
    ...mapState(useMainStore, ['evaluation']),
    ...mapState(useMainStore, ['getUser']),
    evaluationWithoutSummary () {
      const evs = {}

      if (this.evaluation) {
        for (const key in this.evaluation) {
          if (key === 'Grade Summary') {
            continue
          }

          evs[key] = this.evaluation[key]
        }

        return evs
      }

      return {}
    },
    teamMembers () {
      if (this.team && Object.keys(this.team).length) {
        const { members } = this.team

        return members
          .filter((member) => {
            if (!member.is_lead) {
              return true
            }

            return false
          })
          .map((member) => {
            return member.full_name
          })
          .join(', ')
      }

      return ''
    },
    teamLead () {
      if (this.team && Object.keys(this.team).length) {
        const { members } = this.team

        return members
          .filter((member) => {
            if (member.is_lead) {
              return true
            }

            return false
          })[0]
      }

      return {}
    },
    summary () {
      if (this.evaluation && Object.keys(this.evaluation).length) {
        return this.evaluation['Grade Summary']
      }

      return {}
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
