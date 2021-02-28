import { createSeriesOfTotalPopulations } from "@/utils/createSeries";
import { responseOfOsaka, responseOfTokyo } from "./factories/population";

describe("createSeriesOfTotalPopulations", () => {
  it("都道府県を1つ選択した時、グラフ表示のデータとして適した形式に変換できる", () => {
    const actual = createSeriesOfTotalPopulations([responseOfOsaka()]);

    expect(actual).toEqual([
      {
        name: "大阪府",
        data: [
          [1960, 5504746],
          [1965, 6657189],
        ],
        type: "line",
      },
    ]);
  });

  it("都道府県を複数選択した時、グラフ表示のデータとして適した形式に変換できる", () => {
    const actual = createSeriesOfTotalPopulations([
      responseOfOsaka(),
      responseOfTokyo(),
    ]);

    expect(actual).toEqual([
      {
        name: "大阪府",
        data: [
          [1960, 5504746],
          [1965, 6657189],
        ],
        type: "line",
      },
      {
        name: "東京都",
        data: [
          [1960, 9683802],
          [1965, 10869244],
        ],
        type: "line",
      },
    ]);
  });
});
