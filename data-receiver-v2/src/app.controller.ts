import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MeasurementData } from './data/measurement';
import { MeasurementService } from './services/measurement.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly measurementService: MeasurementService,
  ) {}

  @Get()
  getDefault(): string {
    return this.appService.getDefault();
  }

  @Post()
  addMeasurement(@Body() measurement: MeasurementData): string {
    this.measurementService.insert(measurement);
    this.appService.appGateway.handleMeasurementUpdate(measurement);
    return `Measurement ${measurement} successfully inserted!`;
  }
}
