<template>
  <div :id="id" :ref="id" :style="cellStyle" @click="computeCell">
    {{ index }}
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'ACell',

  props: {
    cellStyle: {
      type: Object,
      default: () => {},
    },

    index: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      id: null,
      cellRef: null,
    }
  },

  computed: {
    boundingClient() {
      if (this.cellRef) {
        return JSON.parse(JSON.stringify(this.cellRef.getBoundingClientRect()))
      }
      return null
    },
  },

  watch: {
    boundingClient(val) {
      if (val) {
        this.$store.commit('grid/setCellBound', {
          rect: this.boundingClient,
          id: this.id,
          index: this.index,
        })
      }
    },
  },

  mounted() {
    this.id = uuidv4()
    setTimeout(() => {
      this.cellRef = this.$refs[this.id]
    }, 10)
  },

  methods: {
    computeCell() {
      this.$emit('cell-touched', this.index)
    },
  },
}
</script>
