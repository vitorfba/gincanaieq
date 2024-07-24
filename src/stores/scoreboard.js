import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useScoreBoardStore = defineStore('scoreBoard', () => {
   
    const scoreBoard = useStorage('score-board', {
        teamOne: 0,
        teamTwo: 0,
    }) 

    const teamOneCorrectQuestions = useStorage('team-one-correct-questions', [])
    const teamTwoCorrectQuestions = useStorage('team-two-correct-questions', [])
    const completedQuestions = useStorage('completed-questions', [])

    function incrementTeamOne(points, questionId) {
        scoreBoard.value.teamOne += points
        teamOneCorrectQuestions.value.push(questionId)
    }

    function incrementTeamTwo(points, questionId) {
        scoreBoard.value.teamTwo += points
        teamTwoCorrectQuestions.value.push(questionId)
    }

    function resetScore() {
        scoreBoard.value.teamOne = 0
        scoreBoard.value.teamTwo = 0
    }

    function resetCorrectQuestions() {
        teamOneCorrectQuestions.value = []
        teamTwoCorrectQuestions.value = []
    }

    function resetCompletedQuestions() {
        completedQuestions.value = []
    }

    function addCompletedQuestion(questionId) {
        completedQuestions.value.push(questionId)
    }

    function pluckCompletedQuestion(questionId)
    {
        const index = completedQuestions.value.indexOf(questionId)
        completedQuestions.value.splice(index, 1)
    }

    return {
        scoreBoard,
        incrementTeamOne,
        incrementTeamTwo,
        teamOneCorrectQuestions,
        teamTwoCorrectQuestions,
        completedQuestions,
        resetScore,
        resetCorrectQuestions,
        resetCompletedQuestions,
        addCompletedQuestion,
        pluckCompletedQuestion
        
    }

})
