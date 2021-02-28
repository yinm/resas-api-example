import type { SeriesLineOptions } from "highcharts";
import type {
  ExtendedPopulationResult,
  TotalPopulationResultData,
} from "@/types/resas-api";

export function createSeriesOfTotalPopulations(
  response: ExtendedPopulationResult[]
): SeriesLineOptions[] {
  return response.map((prefecture) => {
    const target = prefecture.data.filter((population) => {
      if (population.label === "総人口") {
        return population.data;
      }
    })[0].data;

    return {
      name: prefecture.prefectureName,
      data: convertPopulation(target),
      type: "line",
    };
  });
}

function convertPopulation(
  populations: TotalPopulationResultData[]
): number[][] {
  const data: number[][] = [];
  populations.forEach((population) => {
    const { year, value } = population;
    data.push([year, value]);
  });

  return data;
}
