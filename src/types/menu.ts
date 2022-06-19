export type Menu = {
  id: string;
  name: string;
  memo: string;
  weight: number | null;
  weightType: WeightType;
  count: number | null;
  set: number | null;
};

export type WeightType = "kg" | "lbs";

export type HistoryMenu = {
  id: string;
  name: string;
};
