<template>
  <div>
    <div class="questions-container">
      <AppQuestionButton
        v-for="(question, index) in questionsList"
        :key="question.id"
        :question-id="question.id"
        :disabled="question.completed"
      >
        {{ question.id }}
      </AppQuestionButton>
    </div>

    <hr />

    <div class="questions-container">
      <AppQuestionButton
        v-for="(question, index) in hardQuestionsList"
        :key="question.id"
        :question-id="question.id"
        :disabled="question.completed"
      >
        🍰 {{ question.id }}
      </AppQuestionButton>
    </div>
  </div>
</template>

<script setup>
import questions from '@database/questions.json'
import questionsHard from '@database/questions-hard.json'
import { useScoreBoardStore } from '@stores/scoreboard'
import AppQuestionButton from './AppQuestionButton.vue'
import { computed } from 'vue'

const { completedQuestions } = useScoreBoardStore()

const questionsList = computed(() => {
  return questions.data.map((question, index) => {
    return {
      ...question,
      completed: completedQuestions.includes(question.id)
    }
  })
})

const hardQuestionsList = computed(() => {
  return questionsHard.data.map((question, index) => {
    return {
      ...question,
      completed: completedQuestions.includes(question.id)
    }
  })
})
</script>

<style lang="scss" scoped></style>
