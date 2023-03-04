import { DataSource } from 'typeorm';
import { Measurement } from './entities/measurement.entity';
import { Segment } from './entities/segment.entity';
import { AddSegments1677936191213 } from './migrations/1677936191213-AddSegments';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db/data.sl3',
  entities: [Measurement, Segment],
  migrations: [AddSegments1677936191213],
});
