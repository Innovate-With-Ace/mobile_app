export type Ingredient = {
  id: string;
  name: string;
  unit: "kg" | "l" | "pcs";
  stock: number;
  low_stock_threshold: number;
};
