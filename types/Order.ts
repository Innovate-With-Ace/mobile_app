export type OrderStatus = "pending" | "preparing" | "completed" | "cancelled";

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  status: OrderStatus;
  source: "pos" | "mobile";
  cashier_id: string;
  cashier_name: string;
  created_at: string;
  items: OrderItem[];
};
