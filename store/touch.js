export const state = () => ({
  elements: [],
})

export const mutations = {
  addElement(state, payload) {
    state.elements.push(payload)
  },
}

export const actions = {}
