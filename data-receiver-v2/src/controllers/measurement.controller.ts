import { Body, Controller, Get, Post } from '@nestjs/common';
import { MeasurementService } from '../services/measurement.service';
import { MeasurementData } from '../data/measurement';
import { Measurement } from '../entities/measurement.entity';

@Controller()
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  getDefault(): Promise<Measurement[]> {
    return this.measurementService.getAll();
  }

  @Post()
  addMeasurement(@Body() measurement: MeasurementData): string {
    this.measurementService.insert({ ...measurement, isApproximated: false });
    this.measurementService.measurementGateway.handleMeasurementUpdate(
      measurement,
    );
    return `Measurement ${measurement} successfully inserted!`;
  }
}
