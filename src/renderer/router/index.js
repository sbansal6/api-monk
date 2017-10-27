import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
