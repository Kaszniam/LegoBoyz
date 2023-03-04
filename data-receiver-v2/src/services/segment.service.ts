import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Segment } from '../entities/segment.entity';
import { SegmentInfo } from '../entities/segmentInfo.entity';

@Injectable()
export class SegmentService {
  constructor(
    @Inject('SEGMENT_REPOSITORY')
    private segmentRepository: Repository<Segment>,
    @Inject('SEGMENT_INFO_REPOSITORY')
    private segmentInfoRepository: Repository<SegmentInfo>,
  ) {}

  getAll() {
    return this.segmentRepository.find();
  }

  getSegmentInfo(rfid) {
    return this.segmentInfoRepository.findOne({ where: { rfid } });
  }
}
