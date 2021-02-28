import type { ExtendedPopulationResult } from "@/types/resas-api";

export function responseOfOsaka(): ExtendedPopulationResult {
  return {
    prefectureName: "大阪府",
    boundaryYear: 2015,
    data: [
      {
        label: "総人口",
        data: [
          { year: 1960, value: 5504746 },
          { year: 1965, value: 6657189 },
        ],
      },
      {
        label: "年少人口",
        data: [
          { year: 1960, value: 1408751, rate: 25.5 },
          { year: 1965, value: 1526823, rate: 22.9 },
        ],
      },
      {
        label: "生産年齢人口",
        data: [
          { year: 1960, value: 3861837, rate: 70.1 },
          { year: 1965, value: 4826846, rate: 72.5 },
        ],
      },
      {
        label: "老年人口",
        data: [
          { year: 1960, value: 234158, rate: 4.2 },
          { year: 1965, value: 303520, rate: 4.5 },
        ],
      },
    ],
  };
}

export function responseOfTokyo(): ExtendedPopulationResult {
  return {
    prefectureName: "東京都",
    boundaryYear: 2015,
    data: [
      {
        label: "総人口",
        data: [
          { year: 1960, value: 9683802 },
          { year: 1965, value: 10869244 },
        ],
      },
      {
        label: "年少人口",
        data: [
          { year: 1960, value: 2249052, rate: 23.2 },
          { year: 1965, value: 2216945, rate: 20.3 },
        ],
      },
      {
        label: "生産年齢人口",
        data: [
          { year: 1960, value: 7067087, rate: 72.9 },
          { year: 1965, value: 8183336, rate: 75.2 },
        ],
      },
      {
        label: "老年人口",
        data: [
          { year: 1960, value: 367663, rate: 3.7 },
          { year: 1965, value: 468963, rate: 4.3 },
        ],
      },
    ],
  };
}
