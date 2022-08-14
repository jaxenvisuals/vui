import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

Vue.directive('touch', {
  inserted: (el, binding, vnode) => {
    const id = uuidv4()

    // set the ID of the element
    el.setAttribute('data-touch-id', id)
    const rect = JSON.parse(JSON.stringify(el.getBoundingClientRect()))
    // register component details
    const store = vnode.context.$store
    store.commit('touch/addElement', {
      id,
      rect,
    })
  },
})
