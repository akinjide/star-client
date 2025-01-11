import { useTimeAgo, useDateFormat } from '@vueuse/core'

export default {
  install: (app, options) => {
    app.config.globalProperties.$timeAgo = (t) => {
      return useTimeAgo(t)
    }

    app.config.globalProperties.$parseDateTime = (t) => {
      if (t) {
        return useDateFormat(t, options.pattern)
      }

      return ''
    }
  }
}
