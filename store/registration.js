export const state = () => ({
  cells: [],
  accessibles: [],
})

export const mutations = {
  setCellBound(state, payload) {
    state.cells.push(payload)
  },

  setAccessibleElement(state, payload) {
    state.accessibles.push(payload)
  },
}

export const actions = {
  async getCell({ state }, payload) {
    const index = await state.cells.findIndex((c) => c.index === payload)

    if (index < 0) return Promise.resolve(null)

    return Promise.resolve(state.cells[index])
  },
}
