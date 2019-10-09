import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify, { VLayout } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
//import IconFont from '../IconFont'
Vue.use(Vuetify, {
  iconfont: 'md',
  components: { VLayout }
})
