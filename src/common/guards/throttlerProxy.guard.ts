import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    return Promise.resolve(getClientIp(req));
  }
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    const [firstIp] = forwardedFor.split(',').map((ip) => ip.trim());
    return firstIp;
  }

  return req.ip ?? '';
}
