<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  questionId: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <RouterLink :to="'/question/' + questionId" class="question-button" :class="{ disabled }">
    <slot></slot>
  </RouterLink>
</template>
