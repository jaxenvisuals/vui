<template>
  <div>
    <Tutorial />
    <GridOverlay />
  </div>
</template>

<script>
import GridOverlay from '@/components/GridOverlay'
export default {
  name: 'IndexPage',

  components: { GridOverlay },

  data() {
    return {}
  },

  methods: {},
}
</script>

<style>
@import url('@/assets/css/tailwind-styles.css');
</style>
