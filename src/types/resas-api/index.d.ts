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
