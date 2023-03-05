import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MeasurementService } from '../services/measurement.service';
import { MeasurementData } from '../data/measurement';
import { Measurement } from '../entities/measurement.entity';

@Controller()
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  getDefault(@Query('rfid') rfid): Promise<Measurement[]> {
    if (rfid) {
      return this.measurementService.getByRfid(rfid);
    }
    return this.measurementService.getAll();
  }

  @Post()
  addMeasurement(@Body() measurement: MeasurementData): string {
    this.measurementService.insert({ ...measurement, isApproximated: false });
    return `Measurement ${measurement} successfully inserted!`;
  }
}
