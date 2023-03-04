import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Segment } from '../entities/segment.entity';

@Injectable()
export class SegmentService {
  constructor(
    @Inject('SEGMENT_REPOSITORY')
    private segmentRepository: Repository<Segment>,
  ) {}

  getAll() {
    return this.segmentRepository.find();
  }
}
