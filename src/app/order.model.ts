import { OrderItemModel } from "./order-item.model";

export interface OrderModel {
  id: number;
  userId: number;
  userName: string;
  orderDate: string;
  orderStatus: string;
  orderItems: OrderItemModel[];
}
