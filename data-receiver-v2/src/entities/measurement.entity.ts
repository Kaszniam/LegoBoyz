import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Measurement {
  @PrimaryColumn({ length: 36 })
  guid: string;

  @Column({ length: 23 })
  datetime: string;

  @Column('float')
  uv: number;

  @Column('float')
  light: number;

  @Column('float')
  temperature: number;

  @Column('float')
  humidity: number;
}
