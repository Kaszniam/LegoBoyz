import { DataSource } from 'typeorm';
import { Measurement } from './entities/measurement.entity';
import { Segment } from './entities/segment.entity';
import { AddSegments1677936191213 } from './migrations/1677936191213-AddSegments';
import { AddSegmentInfos1677970986384 } from './migrations/1677970986384-AddSegmentInfos';
import { SegmentInfo } from './entities/segmentInfo.entity';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db/data.sl3',
  entities: [Measurement, Segment, SegmentInfo],
  migrations: [AddSegments1677936191213, AddSegmentInfos1677970986384],
});
