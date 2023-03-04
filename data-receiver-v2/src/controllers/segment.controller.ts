import { Controller, Get } from '@nestjs/common';
import { SegmentService } from '../services/segment.service';
import { Segment } from '../entities/segment.entity';

@Controller()
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Get()
  getDefault(): Promise<Segment[]> {
    return this.segmentService.getAll();
  }
}
