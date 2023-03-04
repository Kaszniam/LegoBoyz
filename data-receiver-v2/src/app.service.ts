import { Injectable } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Injectable()
export class AppService {
  public appGateway: AppGateway;
  constructor(appGateway: AppGateway) {
    this.appGateway = appGateway;
  }

  getDefault(): string {
    return 'Nothing here!';
  }
}
