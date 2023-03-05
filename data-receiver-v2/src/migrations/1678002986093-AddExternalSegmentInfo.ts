import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExternalSegmentInfo1678002986093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO segment_info (rfid, material, manufacturer, mountedTime, demountedTime, usedTime) VALUES (
                "030200000000000000008706", 
                "plastic", 
                "Lego", 
                "2018-07-29T18:39:26.248Z", 
                "2019-07-29T18:39:26.248Z", 
                "31556926"
               )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM segment_info WHERE rfid='030200000000000000008706';`,
    );
  }
}
