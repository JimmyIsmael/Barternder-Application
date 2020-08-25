import { OrderItemModel } from "./order-item.model";

export interface ItemsAPIResponse {
  status: number;
  results: OrderItemModel[];
  resultsLength: number;
}
