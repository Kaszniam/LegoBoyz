import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDefault(): string {
    return this.appService.getDefault();
  }

  @Get('temperature')
  getTemperature(): string {
    return this.appService.getTemperature();
  }

  @Get('UV')
  getUV(): string {
    return this.appService.getUV();
  }

  @Get('Humidity')
  getHumidity(): string {
    return this.appService.getHumidity();
  }
}
