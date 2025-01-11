<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-stepper
          v-model="step"
          :items="sections"
          hide-actions
        >
          <template v-slot:[`item.1`]>
            <h3 class="text-h6">Report</h3>

            <br>

            <v-sheet border>
              <v-table>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>
                      <div class="d-flex justify-end mr-8">
                        <p class="mx-10">4</p>
                        <p class="mx-10">3</p>
                        <p class="mx-10">2</p>
                        <p class="mx-10">1</p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(rubric, index) in getRubricsSection('Report')" :key="index">
                    <td v-text="rubric.criterion"></td>
                    <td>
                      <v-radio-group
                        v-model="rubric.selected_score"
                        inline
                        class="justify-end d-flex"
                        min-width="450"
                        :error="missingRequired"
                      >
                        <v-radio
                          v-for="(rs, index) in rubric.rubrics_score" :key="index"
                          :value="rs.criterion_score"
                          class="ml-8"
                        >
                          <template v-slot:label>
                            <v-btn variant="tonal" density="comfortable" size="x-small" color="blue" icon="mdi-information" @click="showDialog(rs.description)"></v-btn>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </template>

          <template v-slot:[`item.2`]>
            <h3 class="text-h6">Cooperation with the supervisor</h3>

            <br>

            <v-sheet border>
              <v-table>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>
                      <div class="d-flex justify-end mr-8">
                        <p class="mx-10">4</p>
                        <p class="mx-10">3</p>
                        <p class="mx-10">2</p>
                        <p class="mx-10">1</p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(rubric, index) in getRubricsSection('Cooperation with the supervisor')" :key="index">
                    <td v-text="rubric.criterion"></td>
                    <td>
                      <v-radio-group
                        v-model="rubric.selected_score"
                        inline
                        class="justify-end d-flex"
                        min-width="450"
                        :error="missingRequired"
                      >
                        <v-radio
                          v-for="(rs, index) in rubric.rubrics_score" :key="index"
                          :value="rs.criterion_score"
                          class="ml-8"
                        >
                          <template v-slot:label>
                            <v-btn variant="tonal" density="comfortable" size="x-small" color="blue" icon="mdi-information" @click="showDialog(rs.description)"></v-btn>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </template>

          <template v-slot:[`item.3`]>
            <h3 class="text-h6">Quality and contribution of the project</h3>

            <br>

            <v-sheet border>
              <v-table>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>
                      <div class="d-flex justify-end mr-8">
                        <p class="mx-10">4</p>
                        <p class="mx-10">3</p>
                        <p class="mx-10">2</p>
                        <p class="mx-10">1</p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(rubric, index) in getRubricsSection('Quality and contribution of the project')" :key="index">
                    <td v-text="rubric.criterion"></td>
                    <td>
                      <v-radio-group
                        v-model="rubric.selected_score"
                        inline
                        class="justify-end d-flex"
                        min-width="450"
                        :error="missingRequired"
                      >
                        <v-radio
                          v-for="(rs, index) in rubric.rubrics_score" :key="index"
                          :value="rs.criterion_score"
                          class="ml-8"
                        >
                          <template v-slot:label>
                            <v-btn variant="tonal" density="comfortable" size="x-small" color="blue" icon="mdi-information" @click="showDialog(rs.description)"></v-btn>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </template>

          <template v-slot:[`item.4`]>
            <h3 class="text-h6">Presentation</h3>

            <br>

            <v-sheet border>
              <v-table>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>
                      <div class="d-flex justify-end mr-8">
                        <p class="mx-10">4</p>
                        <p class="mx-10">3</p>
                        <p class="mx-10">2</p>
                        <p class="mx-10">1</p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(rubric, index) in getRubricsSection('Presentation')" :key="index">
                    <td v-text="rubric.criterion"></td>
                    <td>
                      <v-radio-group
                        v-model="rubric.selected_score"
                        inline
                        class="justify-end d-flex"
                        min-width="450"
                        :error="missingRequired"
                      >
                        <v-radio
                          v-for="(rs, index) in rubric.rubrics_score" :key="index"
                          :value="rs.criterion_score"
                          class="ml-8"
                        >
                          <template v-slot:label>
                            <v-btn variant="tonal" density="comfortable" size="x-small" color="blue" icon="mdi-information" @click="showDialog(rs.description)"></v-btn>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </template>

          <template v-slot:[`item.5`]>
            <h3 class="text-h6">Confirm and Submit</h3>

            <br>

            <v-sheet border>
              <v-table>
                <thead>
                  <tr>
                    <th>Grade Summary</th>
                    <th></th>
                    <th class="text-end">Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(section, index) in sections.slice(0, sections.length - 1)" :key="index">
                    <td>{{ index+1 }}. {{ section }}</td>
                    <td></td>
                    <td class="text-end">{{ getRubricsSectionTotal(section) }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">(G) Total  (out of 400)</td>
                    <td></td>
                    <td class="text-end">0</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">(T) Total  (G / 4, out of 100)</td>
                    <td></td>
                    <td class="text-end">0</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">(O) Originality (Absence of plagiarism)1</td>
                    <td></td>
                    <td class="text-end d-flex justify-end">
                      <v-text-field density="compact" hide-details="true" max-width="100" v-model="originality" prepend-icon="mdi-percent"></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Final grade (T x O)</td>
                    <td></td>
                    <td class="text-end">0</td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>

            <div class="mt-4">
              <p class="text-caption">1 Originality is the degree to which the students did the work themselves. 100% means they did all of it themselves. 60% means 40% of the work was done by others. 0% means the whole project is a copy of an existing project done by others.</p>
            </div>
          </template>

          <v-stepper-actions
            :disabled="false"
            :next-text="step == sections.length ? 'submit' : 'next'"
            :prev-text="step > 1 ? 'back': '' "
            @click:next="nextStepper"
            @click:prev="prevStepper"
          ></v-stepper-actions>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      max-width="400"
      prepend-icon="mdi-information"
      :text="description"
      title="Score Description"
    >
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Ok"
          @click="dialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore, useMainStore } from '@/stores'

export default {
  name: 'Team Evaluation',
  data () {
    return {
      dialog: false,
      step: 1,
      description: null,
      originality: 0,
      teamId: null,
      projectId: null,
      sections: [
        'Report',
        'Cooperation with the supervisor',
        'Quality and contribution of the project',
        'Presentation',
        'Submit'
      ],
      missingRequired: false
    }
  },
  components: {},
  methods: {
    ...mapActions(useMainStore, ['getRubrics']),
    ...mapActions(useMainStore, ['getTeam']),
    ...mapActions(useMainStore, ['getProjects']),
    ...mapActions(useMainStore, ['getProjectByTeam']),
    ...mapActions(useMainStore, ['createEvaluation']),
    showDialog (description) {
      this.dialog = true
      this.description = description
    },
    getRubricsSection (section) {
      return this.rubrics.filter((rubric) => {
        if (rubric.section === section) {
          return true
        }

        return false
      })
    },
    getRubricsSectionTotal (section) {
      let total = 0

      for (const rubricsSecion of this.getRubricsSection(section)) {
        total += ((rubricsSecion.selected_score || 0) * rubricsSecion.criterion_weight)
      }

      return total
    },
    checkedRubricsScore (rubrics) {
      return rubrics.every(this.hasSelectedRubricScore)
    },
    hasSelectedRubricScore (rubric) {
      if (rubric && rubric.selected_score) {
        return true
      }

      return false
    },
    async submit () {
      const evaluatedRubrics = this.rubrics
        .filter(this.hasSelectedRubricScore)
        .map((rubric) => {
          return {
            name: rubric.criterion,
            rubric_id: rubric.id,
            score: rubric.selected_score
          }
        })

      const response = await this.createEvaluation(evaluatedRubrics, this.originality, this.user.id, this.projectId)

      if (response) {
        return this.$router.push('/dashboard/evaluations')
      }

      // TODO: something when no response
    },
    prevStepper () {
      if (this.step === 1) {
        return
      }

      this.step = this.step - 1
    },
    nextStepper () {
      if (this.step === this.sections.length) {
        return this.submit()
      }

      if (this.step <= 5) {
        const rubrics = this.getRubricsSection(this.sections[this.step - 1])

        if (!this.checkedRubricsScore(rubrics)) {
          this.missingRequired = true
          console.log('failed')
          return
        }
      }

      this.missingRequired = false
      this.step = this.step + 1
    }
  },
  async created () {
    const teamId = this.$route.params.team_id

    await this.getRubrics()
    await this.getProjects()

    if (teamId) {
      this.teamId = Number(teamId)

      await this.getTeam(this.teamId)
      const { project_id: projectId = null } = await this.getProjectByTeam(this.teamId)
      this.projectId = projectId
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useMainStore, ['project']),
    ...mapState(useMainStore, ['rubrics'])
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
