<template>
  <button
    class="border text-sm leading-none rounded-sm w-[25px] h-[25px] flex items-center justify-center hover:bg-gray-100"
    @click.prevent="emitClick"
  >
    <span class="material-symbols-outlined text-[12px] font-extrabold">
      {{ icon }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'ASmallButton',

  props: {
    icon: {
      type: String,
      default: null,
    },
  },

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>
