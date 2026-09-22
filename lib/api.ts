import { Category } from "@/types/Category";
import { Dish } from "@/types/Dish";
import { Ingredient } from "@/types/Ingredient";
import { Order, OrderStatus } from "@/types/Order";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  if (!BASE_URL) {
    throw new ApiError(0, "EXPO_PUBLIC_BASE_URL is not configured");
  }

  const res = await fetch(`${BASE_URL}/api${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message =
      payload?.error ?? `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message);
  }

  return payload as T;
}

// --- Categories ---
export const getCategories = (token: string | null) =>
  request<Category[]>("/categories", { token });

// --- Dishes ---
export const getDishes = (token: string | null) =>
  request<Dish[]>("/dishes", { token });

// --- Ingredients ---
export const getIngredients = (token: string | null) =>
  request<Ingredient[]>("/ingredients", { token });

// --- Orders ---
export const getOrders = (token: string | null) =>
  request<Order[]>("/orders", { token });

export const updateOrderStatus = (
  token: string | null,
  orderId: string,
  status: OrderStatus,
) =>
  request<Order>(`/orders/${orderId}`, {
    method: "PATCH",
    body: { status },
    token,
  });

// --- POS / checkout ---
export type PlaceOrderPayload = {
  source: "pos" | "mobile";
  items: { item: { id: string; name: string }; quantity: number }[];
};

export const placeOrder = (token: string | null, payload: PlaceOrderPayload) =>
  request<Order>("/pos", { method: "POST", body: payload, token });

// --- Dashboard ---
export const getDashboardStats = (token: string | null) =>
  request<Order[]>("/dashboard/stats", { token });

export const getLowStockIngredients = (token: string | null) =>
  request<Ingredient[]>("/dashboard/low-stock", { token });
