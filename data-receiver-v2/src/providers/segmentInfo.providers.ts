import { DataSource } from 'typeorm';
import { SegmentInfo } from '../entities/segmentInfo.entity';

export const segmentInfoProviders = [
  {
    provide: 'SEGMENT_INFO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SegmentInfo),
    inject: ['DATA_SOURCE'],
  },
];
