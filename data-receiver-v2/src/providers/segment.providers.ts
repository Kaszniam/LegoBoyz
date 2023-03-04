import { DataSource } from 'typeorm';
import { Segment } from '../entities/segment.entity';

export const segmentProviders = [
  {
    provide: 'SEGMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Segment),
    inject: ['DATA_SOURCE'],
  },
];
