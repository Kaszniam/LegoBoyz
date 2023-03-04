import { DataSource } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: './db/data.sl3',
        entities: [Measurement],
      });

      return dataSource.initialize();
    },
  },
];
