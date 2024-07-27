<script setup>
import { useGamepad } from '@vueuse/core'
import { computed, watch, ref } from 'vue'
import { useSettingsStore } from '@/stores'

const props = defineProps({
  timer: {
    type: Number,
    required: false,
    default: null
  }
})

const settingsStore = useSettingsStore() 

const teamOnePressed = ref(false)
const teamTwoPressed = ref(false)

const defaultSettingsGamepad = computed(() => settingsStore.defaultGamepad)

const resetPressed = () => {
  teamOnePressed.value = false
  teamTwoPressed.value = false
}

//create watch to start gamepad listen button, if buttonn by team is pressed, increment score
watch(defaultSettingsGamepad , (newGamepad) => {
  
  if(props.timer && settingsStore.timerOnPieQuestions){
    return
  }

  if (!newGamepad) {
    return
  }

  if (teamOnePressed.value || teamTwoPressed.value) {
    return
  }

  if (newGamepad.buttons[settingsStore.teamOnePieButtonIndex].pressed) {
    teamOnePressed.value = true
    teamTwoPressed.value = false
    return
  }

  if (newGamepad.buttons[settingsStore.teamTwoPieButtonIndex].pressed) {
    teamTwoPressed.value = true
    teamOnePressed.value = false
    return
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div>  
    <div v-if="!defaultSettingsGamepad">
      <i i-carbon-error text="5xl" opacity="50" />
      <div flex="~ col">
        <span text="2xl">Controles não são suportados neste dispositivos</span>
      </div>
    </div>
    <div v-if="defaultSettingsGamepad">
      <div class="row text-center mt-4">
        <div class="col-6 border rounded" :class="{ 'bg-success': teamOnePressed }">
          <h1>{{ settingsStore.teams[0] }}</h1>
        </div>

        <div class="col-6 border rounded" :class="{ 'bg-success': teamTwoPressed }">
          <h1>{{ settingsStore.teams[1] }}</h1>
        </div>

        <div class="row" v-if="teamOnePressed || teamTwoPressed">
          <div class="col-12">
            <button @click="resetPressed" class="btn btn-primary mt-4">Resetar botoes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
