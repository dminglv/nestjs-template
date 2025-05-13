import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Get()
  getOrdersList(): { orders: [] } {
    return this.ordersService.getOrdersList();
  }
}
