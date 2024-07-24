<template>
  <div>
    <transition name="fade">
      <div
        v-show="computedAwserOverlay"
        class="awnser-overlay"
        :class="{
          'awnser-overlay-correct': computedAwserOverlay === 1,
          'awnser-overlay-wrong': computedAwserOverlay === 2
        }"
      >
        <div v-if="computedAwserOverlay === 1">
          <h1>✅ CORRETO!</h1>
          <audio hidden="true" autoplay>
            <source :src="CorrectAwnserAudio" type="audio/mpeg" />
          </audio>
          <div class="awnser-overlay-correct-answer">
            <h1>{{ question.options[question.answer] }}</h1>
          </div>
          <div class="awnser-overlay-buttons">
            <button @click="incrementPoints(question.points, 0)">
              Pontuar {{ settingsStore.teams[0] }}
            </button>
            <button @click="incrementPoints(question.points, 1)">
              Pontuar {{ settingsStore.teams[1] }}
            </button>
            <button @click="settingsStore.hideAnswerOverlay">Continuar</button>
          </div>
        </div>

        <div v-if="computedAwserOverlay === 2">
          <h1>❌ ERRADA!</h1>
          <audio hidden="true" autoplay>
            <source :src="WrongAwnserAudio" type="audio/mpeg" />
          </audio>
          <div class="awnser-overlay-correct-answer">
            <h1>Resposta: {{ question.options[question.answer] }}</h1>
          </div>

          <div class="awnser-overlay-buttons">
            <button @click="settingsStore.hideAnswerOverlay">Continuar</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore, useScoreBoardStore } from '@/stores'
import { useRouter } from 'vue-router'
import CorrectAwnserAudio from '@/assets/sounds/success.mp3'
import WrongAwnserAudio from '@/assets/sounds/fail.mp3'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const { incrementTeamOne, incrementTeamTwo } = useScoreBoardStore()
const settingsStore = useSettingsStore()
const computedAwserOverlay = computed(() => settingsStore.anwserOverlay)

const incrementPoints = (points, teamIndex) => {
  if (teamIndex == 0) incrementTeamOne(points, props.question.id)
  if (teamIndex == 1) incrementTeamTwo(points, props.question.id)
  settingsStore.hideAnswerOverlay()
  router.push('/')
}
</script>
