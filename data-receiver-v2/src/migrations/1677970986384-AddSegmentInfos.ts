import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSegmentInfos1677970986384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const segments = await queryRunner.query('SELECT * FROM segment');
    console.log(segments);
    segments.forEach((segment) =>
      queryRunner.query(
        `INSERT INTO segment_info (rfid, material, manufacturer, mountedTime, demountedTime, usedTime) VALUES (
                "${segment.rfid}", 
                "${
                  ['concrete', 'glass', 'wood', 'steel'][
                    Math.floor(Math.random() * 4)
                  ]
                }", 
                'Lego', 
                '${new Date(
                  Math.floor(
                    Math.random() *
                      (new Date(2023, 2, 2).getTime() -
                        new Date(2000, 11, 31).getTime() +
                        1) +
                      new Date(2000, 11, 31).getTime(),
                  ),
                ).toISOString()}', 
                '', 
                ''
               )`,
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DELETE FROM segmentinfo`);
  }
}
