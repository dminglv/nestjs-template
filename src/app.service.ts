import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): 'OK' {
    return 'OK';
  }
}
