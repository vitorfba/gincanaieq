<script setup>
import { useGamepad } from '@vueuse/core'
import { computed, watch, ref } from 'vue'
import { useSettingsStore } from '@/stores'

const settingsStore = useSettingsStore()
const { isSupported, gamepads } = useGamepad()
const gamepad = computed(() => gamepads.value.find((g) => g.mapping === 'standard'))

const teamOnePressed = ref(false)
const teamTwoPressed = ref(false)

//create watch to start gamepad listen button, if buttonn by team is pressed, increment score
watch(gamepad, (newGamepad) => {
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
})
</script>

<template>
  <div>
    <div v-if="!isSupported">
      <i i-carbon-error text="5xl" opacity="50" />
      <div flex="~ col">
        <span text="2xl">Controles não são suportados neste dispositivos</span>
      </div>
    </div>
    <div v-if="gamepads.length > 0">
      <div class="row text-center mt-4">
        <div class="col-6 border rounded" :class="{ 'bg-success': teamOnePressed }">
          <h1>{{ settingsStore.teams[0] }}</h1>
        </div>

        <div class="col-6 border rounded" :class="{ 'bg-success': teamTwoPressed }">
          <h1>{{ settingsStore.teams[1] }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
