import { OrderModel } from "./order.model";

export interface OrderAPIResponse {
  status: number;
  results: OrderModel[];
  resultsLength: number;
}
