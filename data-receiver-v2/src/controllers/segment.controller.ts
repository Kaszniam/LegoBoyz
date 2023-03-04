import { Controller, Get, Query } from '@nestjs/common';
import { SegmentService } from '../services/segment.service';
import { Segment } from '../entities/segment.entity';
import { SegmentInfo } from '../data/segmentInfo';

@Controller()
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Get()
  getDefault(): Promise<Segment[]> {
    return this.segmentService.getAll();
  }

  @Get('segmentInfo')
  getSegmentInfo(@Query('rfid') rfid): Promise<SegmentInfo> {
    return this.segmentService.getSegmentInfo(rfid);
  }
}
