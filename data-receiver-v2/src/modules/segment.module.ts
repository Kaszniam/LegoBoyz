import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.module';
import { segmentProviders } from '../providers/segment.providers';
import { SegmentService } from '../services/segment.service';
import { SegmentController } from '../controllers/segment.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...segmentProviders, SegmentService],
  controllers: [SegmentController],
  exports: [...segmentProviders],
})
export class SegmentModule {}
