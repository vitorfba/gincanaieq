import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useGamepad } from '@vueuse/core' 

export const useSettingsStore = defineStore('settingsStore', () => {
 
    const defaultTimer = useStorage('defaultTimer', 30)
    const anwserOverlay = ref(null) 
    const teams = useStorage('teams-name', ['Equipe Amarela', 'Equipe Azul'])
    const teamsMembers = useStorage('teams-members', [])
    const timerOnPieQuestions = useStorage('timerOnPieQuestions', false)
    const teamOnePieButtonIndex = useStorage('teamOnePieButtonIndex', 0)
    const teamTwoPieButtonIndex = useStorage('teamTwoPieButtonIndex', 0) 

    const { gamepads, isSupported:gamepadIsSupported } = useGamepad()
    const defaultGamepad = computed(() => gamepads.value[0])

    const setDefaultTimer = (value) => {
        defaultTimer.value = value
    }

    const blinkAnswerOverlay = (correct) => {
        if (correct) {  
            anwserOverlay.value = 1 
        }
        else {
            anwserOverlay.value = 2 
        }
    }

    const hideAnswerOverlay = () => {
        anwserOverlay.value = null
    }
    

    return {
        defaultTimer,
        setDefaultTimer, 
        blinkAnswerOverlay,
        anwserOverlay, 
        hideAnswerOverlay,
        timerOnPieQuestions,
        teams,
        teamsMembers,
        teamOnePieButtonIndex,
        teamTwoPieButtonIndex,
        defaultGamepad,
        gamepadIsSupported 
    }

})
