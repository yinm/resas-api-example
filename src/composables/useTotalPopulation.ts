import { watch, ref } from "vue";
import type { Ref } from "vue";
import settings from "@/utils/settings";
import { createSeriesOfTotalPopulations } from "@/utils/createSeries";
import type { PrefecturesResult } from "@/types/resas-api";

export function useTotalPopulation(
  prefectures: Ref<PrefecturesResult[]>
): {
  checkedPrefectures: Ref;
  totalPopulations: Ref;
  isCreatingGraph: Ref;
  series: Ref;
} {
  const checkedPrefectures = ref([]) as Ref;
  const totalPopulations = ref([]) as Ref;
  const isCreatingGraph = ref(false);
  const series = ref([]) as Ref;

  const getPopulation = async (prefCode: number, prefectureName: string) => {
    const res = await fetch(
      settings.apiRoot + `population?prefCode=${prefCode}`
    );
    if (!res.ok) {
      throw new Error(
        `HTTPエラーです。ページを再更新しても解決しない場合は、以下のコードとメッセージを開発者に伝えてください。\nコード: ${res.status}\nメッセージ: ${res.statusText}`
      );
    } else {
      const json = await res.json();

      const totalPopulation = { prefectureName, ...json.result };
      totalPopulations.value.push(totalPopulation);
    }
  };

  watch(checkedPrefectures, async (newValue: { string: number }) => {
    isCreatingGraph.value = true;
    totalPopulations.value = [];
    try {
      for (const prefCode of Object.values(newValue)) {
        const prefectureName = prefectures.value[prefCode - 1].prefName;
        await getPopulation(prefCode, prefectureName);
      }

      series.value = createSeriesOfTotalPopulations(totalPopulations.value);
    } catch (e) {
      // チェックボックスの状態を、表示中のグラフと合わせる
      checkedPrefectures.value.pop();
      alert(e);
    } finally {
      isCreatingGraph.value = false;
    }
  });

  return { checkedPrefectures, totalPopulations, isCreatingGraph, series };
}
