import { Injectable } from '@nestjs/common';
import packageJson from '../package.json';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Test Print is done!';
  }
}
