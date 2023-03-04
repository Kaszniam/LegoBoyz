import { DataSource } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';

export const measurementProviders = [
  {
    provide: 'MEASUREMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Measurement),
    inject: ['DATA_SOURCE'],
  },
];
