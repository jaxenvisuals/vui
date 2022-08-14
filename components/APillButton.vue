<template>
  <button
    class="px-2 py-2 text-xs font-bold border rounded-sm hover:border-blue-400"
    :class="[{ 'bg-blue-200 border-blue-200': selected }]"
    @click.prevent="emitClick"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'APillButton',

  props: {
    name: {
      type: String,
      default: null,
    },

    selected: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>
