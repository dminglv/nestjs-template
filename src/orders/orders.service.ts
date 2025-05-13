import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  getOrdersList(): { orders: [] } {
    return {
      orders: [],
    };
  }
}
