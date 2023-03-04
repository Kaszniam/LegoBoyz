import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';
import { MeasurementData } from '../data/measurement';

@Injectable()
export class MeasurementService {
  constructor(
    @Inject('MEASUREMENT_REPOSITORY')
    private measurementRepository: Repository<Measurement>,
  ) {}

  insert(record: MeasurementData) {
    return this.measurementRepository.insert(record);
  }
}
