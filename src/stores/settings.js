import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settingsStore', () => {
 
    const defaultTimer = ref(30)
    const anwserOverlay = ref(null) 
    const teams = useStorage('teams-name', ['Equipe Amarela', 'Equipe Azul'])
    const teamsMembers = useStorage('teams-members', [])
    const timerOnPieQuestions = ref(false)
    const teamOnePieButtonIndex = useStorage('teamOnePieButtonIndex', 0)
    const teamTwoPieButtonIndex = useStorage('teamTwoPieButtonIndex', 0)

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
        teamTwoPieButtonIndex
    }

})
