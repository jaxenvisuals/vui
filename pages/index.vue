<template>
  <div>
    <Tutorial />
    <GridOverlay
      v-touch
      :class="[{ 'pointer-events-none': !touchable }]"
      @cell-touched="handleCellTouched"
    />
  </div>
</template>

<script>
import GridOverlay from '@/components/GridOverlay'
export default {
  name: 'IndexPage',

  components: { GridOverlay },

  data() {
    return {
      touchable: true,
    }
  },

  methods: {
    async handleCellTouched(e) {
      const cell = await this.$store.dispatch('registration/getCell', e)

      const selectedElement = this.$store.state.registration.accessibles[0]

      const gridCell = {
        top: cell.rect.top,
        bottom: cell.rect.bottom,
        left: cell.rect.left,
        right: cell.rect.right,
        width: cell.rect.width,
        height: cell.rect.height,
      }

      const element = {
        top: selectedElement.rect.top,
        bottom: selectedElement.rect.bottom,
        left: selectedElement.rect.left,
        right: selectedElement.rect.right,
        width: selectedElement.rect.width,
        height: selectedElement.rect.height,
      }
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
      const xWithin =
        element.top > gridCell.top && element.bottom < gridCell.bottom
      const yWithin =
        element.left > gridCell.left && element.right < gridCell.right
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

      console.log('Is Valid:', rulesArray.includes(true))
    },
  },
}
</script>
