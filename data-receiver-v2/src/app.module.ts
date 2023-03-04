import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { MeasurementModule } from './modules/measurement.module';

@Module({
  imports: [MeasurementModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
