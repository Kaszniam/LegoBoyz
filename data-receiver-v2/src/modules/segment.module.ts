import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.module';
import { segmentProviders } from '../providers/segment.providers';
import { SegmentService } from '../services/segment.service';
import { SegmentController } from '../controllers/segment.controller';
import { segmentInfoProviders } from '../providers/segmentInfo.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...segmentProviders, ...segmentInfoProviders, SegmentService],
  controllers: [SegmentController],
  exports: [...segmentProviders, ...segmentInfoProviders],
})
export class SegmentModule {}
