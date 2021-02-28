export type PopulationResult = {
  boundaryYear: number;
  data: (
    | {
        label: string;
        data: {
          year: number;
          value: number;
        }[];
      }
    | {
        label: string;
        data: {
          year: number;
          value: number;
          rate: number;
        }[];
      }
  )[];
};

export type ExtendedPopulationResult = PopulationResult & {
  prefectureName: string;
};

// FIXME: `PopulationResult.data.data` の型を抽出したいが、ネストに対応したPickの作り方が分からなかったので、一旦ベタ書きにしている
export type TotalPopulationResultData = {
  year: number;
  value: number;
};
