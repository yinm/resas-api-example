import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import settings from "@/utils/settings";

export function usePrefectures(): { prefectures: Ref } {
  const prefectures = ref([]);

  onMounted(async () => {
    try {
      const res = await fetch(settings.apiRoot + "prefectures");

      if (!res.ok) {
        throw new Error(
          `HTTPエラーです。ページを再更新しても解決しない場合は、以下のコードとメッセージを開発者に伝えてください。\nコード: ${res.status}\nメッセージ: ${res.statusText}`
        );
      } else {
        const json = await res.json();
        prefectures.value = json.result;
      }
    } catch (e) {
      alert(e);
    }
  });

  return { prefectures };
}
