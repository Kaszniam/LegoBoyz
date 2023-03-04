import { Module } from '@nestjs/common';
import { MeasurementService } from '../services/measurement.service';
import { DatabaseModule } from './db.module';
import { measurementProviders } from '../providers/measurement.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...measurementProviders, MeasurementService],
  exports: [MeasurementService],
})
export class MeasurementModule {}
