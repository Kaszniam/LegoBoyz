import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';

export class AddSegments1677936191213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const inputFile = '../IFC/parameters.txt';
    const fileContents = fs.readFileSync(inputFile, 'utf8');
    const lines = fileContents.split('\n');
    lines.shift();
    const segments = lines.map((line) => line.replace('\n', '').split(','));
    await queryRunner.query(
      `INSERT INTO Segment (guid, rfid, building, schedule, color, layer, length, width, x, y, z) VALUES ${segments
        .map(
          (s) =>
            `("${s[0]}", "${s[1]}", "${s[2]}", ${s[3]}, "${s[4]}", ${s[5]}, ${s[6]}, ${s[7]}, ${s[8]}, ${s[9]}, ${s[10]})`,
        )
        .join(',')}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Segment`);
  }
}
