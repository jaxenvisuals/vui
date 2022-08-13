<template>
  <div
    ref="grid-container"
    class="fixed left-0 top-0 bottom-0 right-0 w-full h-full z-10"
  >
    <div
      v-if="gridStyle"
      class="h-full divide-x divide-y divide-red-500"
      :style="gridStyle"
    >
      <ACell
        v-for="i in computedDimension.cells"
        :key="i"
        :cell-style="squareStyle"
        :index="i"
        @cell-touched="handleCellTouched"
      />
    </div>
  </div>
</template>

<script>
import ACell from './ACell.vue'
export default {
  name: 'GridOverlay',

  components: { ACell },

  data() {
    return {
      ready: false,
      grid: null,
      percentage: 9,
    }
  },

  computed: {
    gridStyle() {
      if (this.computedDimension) {
        return this.computedDimension.gridStyle
      }
      return ''
    },

    squareStyle() {
      if (this.computedDimension) {
        return {
          height: this.computedDimension.square + 'px',
        }
      }
      return ''
    },

    computedDimension() {
      let dimensions = null
      const gridContainer = this.grid
      if (gridContainer) {
        const clientRect = gridContainer.getBoundingClientRect()
        const height = clientRect.height
        const width = clientRect.width
        const percentage = this.percentage
        const sizePerPercent = width * (percentage / 100)
        const rowCount = Number((height / sizePerPercent).toFixed())
        const columnCount = Number((width / sizePerPercent).toFixed())
        dimensions = {
          square: sizePerPercent,
          rowCount,
          columnCount,
          gridStyle: {
            display: 'grid',
            'grid-template-columns': 'repeat(' + columnCount + ', 1fr)',
            'grid-column-gap': '0px',
            'grid-row-gap': '0px',
          },
          cells: rowCount * columnCount,
        }
      }
      return dimensions
    },
  },

  mounted() {
    this.grid = this.$refs['grid-container']
  },

  methods: {
    handleCellTouched(e) {
      this.$emit('cell-touched', e)
    },
  },
}
</script>
