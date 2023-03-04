import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';
import { MeasurementData } from '../data/measurement';
import { MeasurementGateway } from '../gateways/measurement.gateway';

@Injectable()
export class MeasurementService {
  constructor(
    @Inject('MEASUREMENT_REPOSITORY')
    private measurementRepository: Repository<Measurement>,
    public measurementGateway: MeasurementGateway,
  ) {}

  insert(record: MeasurementData) {
    return this.measurementRepository.insert(record);
  }

  getAll() {
    return this.measurementRepository.find();
  }
}
