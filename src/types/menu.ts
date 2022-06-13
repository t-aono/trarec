export type Menu = {
  id: string;
  name: string;
  memo: string;
  weight: number;
  weightType: WeightType;
  count: number;
  set: number;
};

export type WeightType = "kg" | "lbs";
