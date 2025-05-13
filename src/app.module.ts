import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { OrdersModule } from './orders/orders.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { ThrottlerGuardProvider } from './throttler-guard.provider';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ENVIRONMENT: Joi.string().required().default('local-dev'),
        PORT: Joi.number().required().default(8000),
      }),
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ThrottlerGuardProvider],
})
export class AppModule {}
