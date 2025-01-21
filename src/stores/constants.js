export const ADMINISTRATOR_ID = 1
export const SUPERVISOR_ID = 2
export const COMMITTEE_MEMBER_ID = 3
export const STUDENT_ID = 4
export const ADMINISTRATOR = 'Administrator'
export const SUPERVISOR = 'Supervisor'
export const COMMITTEE_MEMBER = 'Committee Member'
export const STUDENT = 'Student'
export const SERVER_ADDRESS = 'http://localhost:3000'
export const HTTPS = 'https'
export const HTTP = 'http'
export const ROLE_MAP = {
  [ADMINISTRATOR_ID]: ADMINISTRATOR,
  [SUPERVISOR_ID]: SUPERVISOR,
  [COMMITTEE_MEMBER_ID]: COMMITTEE_MEMBER,
  [STUDENT_ID]: STUDENT
}
export const MAX_PROGRESS_REPORT = 8
export const YEARS = ['2024', '2025', '2026', '2027', '2028', '2029', '2030']
export const ROMANS = ['I', 'II', 'III', 'IV']
export const REPORT_TYPES = [
  'PPM Report',
  'Final Report',
  'Progress Report'
]
export const TEMPLATES = [
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
]
export const FILTERS = [
  'All',
  'Evaluated',
  'Unevaluated'
]
