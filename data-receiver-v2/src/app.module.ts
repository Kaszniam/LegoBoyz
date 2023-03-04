import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasurementModule } from './modules/measurement.module';
import { RouterModule } from '@nestjs/core';
import { SegmentModule } from './modules/segment.module';

@Module({
  imports: [
    MeasurementModule,
    SegmentModule,
    RouterModule.register([
      {
        path: 'measurements',
        module: MeasurementModule,
      },
      {
        path: 'segments',
        module: SegmentModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
