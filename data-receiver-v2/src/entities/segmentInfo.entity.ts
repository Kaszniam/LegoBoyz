import { Entity, Column, PrimaryColumn } from 'typeorm';

/***
 * Create table segment_info(rfid varchar(24), material varchar(64), manufacturer varchar(128), mountedTime varchar(128), demountedTime varchar(128), usedTime varchar(128))
 ***/

@Entity()
export class SegmentInfo {
  @PrimaryColumn({ length: 24 })
  rfid: string;
  @Column({ length: 64 })
  material: string;
  @Column({ length: 128 })
  manufacturer: string;
  @Column({ length: 128 })
  mountedTime: string;
  @Column({ length: 128 })
  demountedTime: string;
  @Column({ length: 128 })
  usedTime: string;
}
