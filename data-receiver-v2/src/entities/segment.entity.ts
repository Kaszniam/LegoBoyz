import { Entity, Column, PrimaryColumn } from 'typeorm';

/***
 * Create table segment(guid varchar(22),  rfid varchar(24), building varchar(1), schedule integer, color varchar(64), layer integer, length float, width float, x float, y float, z float)
 ***/

@Entity()
export class Segment {
  @Column({ length: 22 })
  guid: string;
  @PrimaryColumn({ length: 24 })
  rfid: string;
  @Column({ length: 1 })
  building: string;
  @Column('int')
  schedule: number;
  @Column({ length: 64 })
  color: string;
  @Column('int')
  layer: number;
  @Column('float')
  length: number;
  @Column('float')
  width: number;
  @Column('float')
  x: number;
  @Column('float')
  y: number;
  @Column('float')
  z: number;
}
