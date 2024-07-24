<template>
  <div>
    <div class="row">
      <h1>Configurações</h1>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="defaultTimer">Tempo padrão para resposta (segundos):</label>
          <input
            type="number"
            class="form-control"
            id="defaultTimer"
            v-model="settingsStore.defaultTimer"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="teams">Times:</label>
          <input type="text" class="form-control" id="teams" v-model="settingsStore.teams[0]" />
          <input
            type="text"
            class="form-control mt-2"
            id="teams"
            v-model="settingsStore.teams[1]"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Editar pontuação:</label>
          <div class="row">
            <div class="col-6">
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  v-model="scoreBoardStore.scoreBoard.teamOne"
                />
                <label for="floatingInputGroup1">{{ settingsStore.teams[0] }}</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  v-model="scoreBoardStore.scoreBoard.teamTwo"
                />
                <label for="floatingInputGroup1">{{ settingsStore.teams[1] }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6 d-flex justify-content-center align-items-center">
        <div class="form-group">
          <button class="btn btn-danger" @click="resetScoresAndQuestions">
            Resetar pontuação e questões
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-6">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="showTimer"
            role="switch"
            v-model="settingsStore.timerOnPieQuestions"
          />
          <label class="form-check-label">Exibir tempo nas perguntas da torta na cara?</label>
        </div>
      </div>

      <div class="col-6">
        <div><strong>Questões respondidas:</strong> {{ scoreBoardStore.completedQuestions }}</div>
        <div>
          <strong>Acertos {{ settingsStore.teams[0] }}: </strong>
          {{ scoreBoardStore.teamOneCorrectQuestions }}
        </div>
        <div>
          <strong>Acertos {{ settingsStore.teams[1] }}: </strong>
          {{ scoreBoardStore.teamTwoCorrectQuestions }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore, useScoreBoardStore } from '@/stores'
const settingsStore = useSettingsStore()
const scoreBoardStore = useScoreBoardStore()

const resetScoresAndQuestions = () => {
  scoreBoardStore.resetCompletedQuestions()
  scoreBoardStore.resetScore()
  scoreBoardStore.resetCorrectQuestions()
}
</script>

<style lang="scss" scoped></style>
