import { APP_GUARD } from '@nestjs/core';
import { Provider } from '@nestjs/common';

import { ThrottlerBehindProxyGuard } from './common/guards/throttlerProxy.guard';

export const ThrottlerGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: ThrottlerBehindProxyGuard,
};
