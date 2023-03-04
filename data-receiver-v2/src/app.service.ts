import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDefault(): string {
    return 'Nothing here!';
  }

  getTemperature(): string {
    return 'Temperature is cold!';
  }

  getUV(): string {
    return 'UV is high!';
  }

  getHumidity(): string {
    return 'Humidity is wet!';
  }
}
