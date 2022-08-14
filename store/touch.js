/* eslint-disable eqeqeq */
export const state = () => ({
  elements: [],
})

export const mutations = {
  addElement(state, payload) {
    state.elements.push(payload)
  },
}

export const actions = {
  findElementsInCell({ state, rootState }, payload) {
    const { trigger, cellNumber } = payload

    const cell = rootState.grid.cells.findIndex((c) => c.index == cellNumber)

    if (cell < 0) return

    switch (trigger.key) {
      case 'click': {
        const validElements = findElement({
          cell: rootState.grid.cells[cell],
          elements: state.elements,
        })
        console.log('Valid Elements are', validElements)
        break
      }
      default:
        break
    }
  },
}

const findElement = ({ cell, elements }) => {
  const gridCell = {
    top: cell.rect.top,
    bottom: cell.rect.bottom,
    left: cell.rect.left,
    right: cell.rect.right,
    width: cell.rect.width,
    height: cell.rect.height,
  }

  const validElements = []

  elements.forEach((el) => {
    const element = {
      top: el.rect.top,
      bottom: el.rect.bottom,
      left: el.rect.left,
      right: el.rect.right,
      width: el.rect.width,
      height: el.rect.height,
    }

    const isValid = analyseElementsInCell(gridCell, element)

    if (isValid) {
      validElements.push(el)
    }
  })

  return validElements
}

const analyseElementsInCell = (gridCell, element) => {
  const isTop =
    element.bottom < gridCell.bottom &&
    element.bottom > gridCell.top &&
    element.top < gridCell.top
  const isBottom =
    element.top > gridCell.top &&
    element.top < gridCell.bottom &&
    element.bottom > gridCell.bottom
  const isLeft =
    element.right < gridCell.right &&
    element.right > gridCell.left &&
    element.left < gridCell.left
  const isRight =
    element.left > gridCell.left &&
    element.left < gridCell.right &&
    element.right > gridCell.right
  const xSideIntersects =
    element.left < gridCell.left && element.right > gridCell.right
  const ySideIntersects =
    element.top < gridCell.top && element.bottom > gridCell.bottom
  const xWithin = element.top > gridCell.top && element.bottom < gridCell.bottom
  const yWithin = element.left > gridCell.left && element.right < gridCell.right
  const isWithin =
    element.top > gridCell.top &&
    element.bottom < gridCell.bottom &&
    element.left > gridCell.left &&
    element.right < gridCell.right

  const isTopLeft = isTop && isLeft
  const isTopRight = isTop && isRight
  const isBottomLeft = isBottom && isLeft
  const isBottomRight = isBottom && isRight
  const isTopIntersects = isTop && xSideIntersects
  const isBottomIntersects = isBottom && xSideIntersects
  const isLeftIntersects = isLeft && ySideIntersects
  const isRightIntersects = isRight && ySideIntersects
  const isTopWithin = isTop && yWithin
  const isBottomWithin = isBottom && yWithin
  const isLeftWithin = isLeft && xWithin
  const isRightWithin = isRight && xWithin
  const isTopBottomWithin = yWithin && ySideIntersects
  const isLeftRightWithin = xWithin && xSideIntersects
  const isAround = ySideIntersects && xSideIntersects

  const rulesArray = [
    isWithin,
    isTopWithin,
    isBottomWithin,
    isLeftWithin,
    isRightWithin,
    isTopIntersects,
    isBottomIntersects,
    isLeftIntersects,
    isRightIntersects,
    isTopLeft,
    isTopRight,
    isBottomLeft,
    isBottomRight,
    isTopBottomWithin,
    isLeftRightWithin,
    isAround,
  ]

  return rulesArray.includes(true)
}
