import { Module } from '@nestjs/common';
import { MeasurementService } from '../services/measurement.service';
import { DatabaseModule } from './db.module';
import { measurementProviders } from '../providers/measurement.providers';
import { MeasurementGateway } from '../gateways/measurement.gateway';
import { MeasurementController } from '../controllers/measurement.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...measurementProviders, MeasurementService, MeasurementGateway],
  controllers: [MeasurementController],
})
export class MeasurementModule {}
