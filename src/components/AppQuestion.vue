<template>
  <div class="question-title">
    <h1>{{ question.question }}</h1>
    <small>({{ question.points }} pontos)</small>
  </div>

  <div class="question-options">
    <div v-for="(option, index) in question.options" :key="index">
      <button class="question-option" @click="answerQuestion(index)" v-if="!isCompleted">
        ({{ optionsLetters[index] }}) {{ option }}
      </button>
    </div>
  </div>

  <div class="question-correct-answer" v-if="isCompleted">
    <h1>Resposta: {{ question.options[question.answer] }}</h1>
    <button class="question-option" @click="pluckCompletedQuestion(props.question.id)">
      Restaurar questão
    </button>
  </div>

  <div class="row" v-if="question.points > 10">
    <div class="col-12">
      <AppJoystickPie />
    </div>
  </div>

  <AppAwnserOverlay :question="question" />
</template>

<script setup>
import { computed } from 'vue'
import { useScoreBoardStore, useSettingsStore } from '@stores'
import AppAwnserOverlay from './AppAwnserOverlay.vue'
import AppJoystickPie from './AppJoystickPie.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const { addCompletedQuestion, completedQuestions, pluckCompletedQuestion } = useScoreBoardStore()
const settingsStore = useSettingsStore()

const optionsLetters = ['A', 'B', 'C', 'D']

const isCompleted = computed(() => {
  return completedQuestions.includes(props.question.id)
})

const answerQuestion = (answer) => {
  if (isCompleted.value) {
    return
  }

  settingsStore.blinkAnswerOverlay(answer === props.question.answer)

  addCompletedQuestion(props.question.id)
}
</script>

<style lang="scss" scoped></style>
