<template>
  <VApp>
    <component :is="is" v-bind="attrs">
      <slot v-for="name in Object.keys($slots)" :name="name" />
    </component>
  </VApp>
</template>

<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  is: { type: Object, required: true }
})

// all attributes passed to the tested component
const attrs = useAttrs()
</script>
