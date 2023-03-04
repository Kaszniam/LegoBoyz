import { Module } from '@nestjs/common';
import { MeasurementService } from '../services/measurement.service';
import { DatabaseModule } from './db.module';
import { measurementProviders } from '../providers/measurement.providers';
import { MeasurementGateway } from '../gateways/measurement.gateway';
import { MeasurementController } from '../controllers/measurement.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { SegmentService } from '../services/segment.service';
import { ApproximationService } from '../services/approximation.service';
import { SegmentModule } from './segment.module';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), SegmentModule],
  providers: [
    ...measurementProviders,
    MeasurementService,
    ApproximationService,
    MeasurementGateway,
    SegmentService,
  ],
  controllers: [MeasurementController],
})
export class MeasurementModule {}
