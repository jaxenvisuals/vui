<template>
  <div
    ref="grid-container"
    class="fixed top-0 bottom-0 left-0 right-0 z-10 w-full h-full pointer-events-none"
  >
    <div
      v-if="gridStyle"
      class="h-full divide-x divide-y divide-red-500 divide-dashed fade-in-out"
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

    <ControllerDialog />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import ACell from './ACell.vue'
import ControllerDialog from './ControllerDialog.vue'

export default {
  name: 'GridOverlay',

  components: { ACell, ControllerDialog },

  data() {
    return {
      id: null,
      ready: false,
      grid: null,
      percentage: 7,
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
      if (gridContainer && this.id) {
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
    this.id = uuidv4()
    this.init()
  },

  methods: {
    handleCellTouched(e) {
      this.$emit('cell-touched', e)
    },

    init() {
      window.addEventListener('resize', () => {
        this.id = uuidv4()
      })
    },
  },
}
</script>

<style scoped>
.fade-in-out {
  animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
