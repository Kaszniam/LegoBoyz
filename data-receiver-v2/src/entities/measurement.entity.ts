import { Entity, Column, PrimaryColumn } from 'typeorm';

/***
 * Create table measurement(guid varchar(36), rfid varchar(24),  datetime varchar(23), uv float, light float, temperature float, humidity float, isApproximated boolean)
 ***/

@Entity()
export class Measurement {
  @PrimaryColumn({ length: 37 })
  guid: string;

  @Column({ length: 24 })
  rfid: string;

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

  @Column('boolean')
  isApproximated: boolean;
}
