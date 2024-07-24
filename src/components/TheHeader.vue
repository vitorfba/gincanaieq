<template>
  <div class="header">
    <div class="header-logo">
      <img :src="LogoImage" alt="Logo" />
    </div>

    <div class="scoreboard">
      <!-- score board with Team 1 and Team 2 points -->

      <div class="team">
        <div class="team-name">{{ settingsStore.teams[0] }}</div>
        <div class="team-score">{{ scoreBoard.teamOne }}</div>
      </div>

      <div class="team">
        <div class="team-name">{{ settingsStore.teams[1] }}</div>
        <div class="team-score">{{ scoreBoard.teamTwo }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScoreBoardStore, useSettingsStore } from '@stores'
import LogoImage from '@/assets/imgs/logo.png'

const { scoreBoard } = useScoreBoardStore()
const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped></style>
