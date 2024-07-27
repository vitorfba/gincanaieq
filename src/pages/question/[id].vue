<template>
  <div>
    <div class="question-controls p-4">
      <RouterLink to="/"> Retornar</RouterLink>
    </div>

    <div
      class="question-timer"
      v-if="
        questionData.points <= 10 || (settingsStore.timerOnPieQuestions && questionData.points > 10)
      "
    >
      <div class="timer" :class="{ timeout: questionTimer <= 0 }">
        {{ questionTimer || 'TEMPO ESGOTADO' }}
      </div>
    </div>

    <div class="question-container">
      <AppQuestion :question="questionData" :timer="questionTimer" />
    </div>
  </div>
</template>

<script setup>
import questions from '@database/questions.json'
import hardQuestions from '@database/questions-hard.json'
import AppQuestion from '@/components/AppQuestion.vue'
import { onUnmounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores'

const route = useRoute()
const settingsStore = useSettingsStore()
const questionTimer = ref(settingsStore.defaultTimer)
const appQuestions = [...questions.data, ...hardQuestions.data]

const questionData = computed(() => {
  const questionId = Number(route.params.id)
  return {
    ...appQuestions.find((question) => question.id === questionId)
  }
})

const timer = setInterval(() => {
  if (questionTimer.value === 0) {
    clearInterval(timer)
    return
  }
  questionTimer.value--
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped></style>
