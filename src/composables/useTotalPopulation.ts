import { watch, ref } from "vue";
import type { Ref } from "vue";
import settings from "@/utils/settings";
import { createSeriesOfTotalPopulations } from "@/utils/createSeries";
import type {
  PrefecturesResult,
  ExtendedPopulationResult,
} from "@/types/resas-api";

export function useTotalPopulation(
  prefectures: Ref<PrefecturesResult[]>
): {
  checkedPrefectures: Ref;
  isCreatingGraph: Ref;
  series: Ref;
} {
  const checkedPrefectures = ref([]) as Ref;
  const isCreatingGraph = ref(false);
  const series = ref([]) as Ref;
  const cachedPopulations = new Map<number, ExtendedPopulationResult>();
  let selectedTotalPopulations = [] as ExtendedPopulationResult[];

  const getPopulation = async (prefCode: number, prefectureName: string) => {
    if (cachedPopulations.has(prefCode)) {
      selectedTotalPopulations.push(
        cachedPopulations.get(prefCode) as ExtendedPopulationResult
      );
      return;
    }

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
      selectedTotalPopulations.push(totalPopulation);
      cachedPopulations.set(prefCode, totalPopulation);
    }
  };

  watch(checkedPrefectures, async (newValue: { string: number }) => {
    isCreatingGraph.value = true;
    selectedTotalPopulations = [];
    try {
      for (const prefCode of Object.values(newValue)) {
        const prefectureName = prefectures.value[prefCode - 1].prefName;
        await getPopulation(prefCode, prefectureName);
      }

      series.value = createSeriesOfTotalPopulations(selectedTotalPopulations);
    } catch (e) {
      // チェックボックスの状態を、表示中のグラフと合わせる
      checkedPrefectures.value.pop();
      alert(e);
    } finally {
      isCreatingGraph.value = false;
    }
  });

  return { checkedPrefectures, isCreatingGraph, series };
}
