<template>
  <div class="stack-5 center">
    <h1>都道府県別の総人口推移グラフ</h1>
    <div class="stack-3">
      <h2>都道府県</h2>
      <div class="App-checkboxes">
        <div v-for="prefecture in prefectures" :key="prefecture.prefCode">
          <input
            :id="prefecture.prefName"
            v-model="checkedPrefectures"
            type="checkbox"
            name="prefCode"
            :value="prefecture.prefCode"
          />
          <label :for="prefecture.prefName">{{ prefecture.prefName }}</label>
        </div>
      </div>
    </div>

    <p v-show="isCreatingGraph">
      グラフの表示処理をしています。少々お待ちください。
    </p>
    <template v-if="!isCreatingGraph">
      <TotalPopulationChart v-if="series.length >= 1" :series="series" />
      <p v-else>
        チェックボックスで選択した都道府県の総人口グラフが表示されます。
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalPopulationChart from "@/components/TotalPopulationChart.vue";
import { usePrefectures } from "@/composables/usePrefectures";
import { useTotalPopulation } from "@/composables/useTotalPopulation";

export default defineComponent({
  components: {
    TotalPopulationChart,
  },

  setup() {
    const { prefectures } = usePrefectures();

    const { checkedPrefectures, isCreatingGraph, series } = useTotalPopulation(
      prefectures
    );

    return {
      prefectures,
      checkedPrefectures,
      isCreatingGraph,
      series,
    };
  },
});
</script>

<style>
@import "./assets/stylesheets/index.css";
</style>

<style scoped>
.App-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
</style>
