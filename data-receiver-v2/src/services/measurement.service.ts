import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';
import { MeasurementGateway } from '../gateways/measurement.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SegmentService } from './segment.service';
import { v4 as uuidv4 } from 'uuid';
import { ApproximationService } from './approximation.service';
import { MeasurementData } from '../data/measurement';

@Injectable()
export class MeasurementService {
  private MEASUREMENT_ARRAY_SIZE_LIMIT = 1024;
  private measurementArray: Measurement[] = [];
  private readonly logger = new Logger(MeasurementService.name);

  constructor(
    @Inject('MEASUREMENT_REPOSITORY')
    private measurementRepository: Repository<Measurement>,
    private segmentService: SegmentService,
    private approximationService: ApproximationService,
    public measurementGateway: MeasurementGateway,
  ) {}

  insert(record: Measurement) {
    if (this.measurementArray.length > this.MEASUREMENT_ARRAY_SIZE_LIMIT) {
      this.logger.debug('Preventing measurement array overflow, shifting!');
      this.measurementArray.shift();
    }
    this.measurementArray.push(record);
    this.logger.debug('New measurement added: ' + record.guid);
  }

  getAll() {
    return this.measurementRepository.find();
  }

  getByRfid(rfid: string) {
    return this.measurementRepository.findBy({ rfid });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    const measurementsArrayCopy = [...this.measurementArray];
    this.measurementArray = [];
    const measurementsAvailable = measurementsArrayCopy.length;
    this.logger.debug(
      `Measurements waiting to be added: ${measurementsAvailable}`,
    );

    if (measurementsAvailable < 4) {
      this.logger.debug('Less than 4 measurements are available, skipping.');
      return;
    }

    const lastFourMeasurementsFromDifferentSensors = Object.values(
      measurementsArrayCopy.reduce((accumulator, item) => {
        const { rfid, ...rest } = item;
        return {
          ...accumulator,
          [rfid]: { rfid, ...rest },
        };
      }, {}),
    );

    // if (lastFourMeasurementsFromDifferentSensors.length < 4) {
    //   this.logger.debug(
    //     'Less than 4 measurements from unique sensors are available, skipping.',
    //   );
    //   return;
    // }

    this.segmentService.getAll().then((segments) => {
      const rfidsOfSegmentsWithSensors =
        lastFourMeasurementsFromDifferentSensors.map((ele) => ele['rfid']);
      const segmentsForWhichWeNeedToGenerateMeasurements = segments.filter(
        (seg) => !rfidsOfSegmentsWithSensors.includes(seg.rfid),
      );
      const segmentsForWhichWeDoNotNeedToGenerateMeasurements = segments.filter(
        (seg) => rfidsOfSegmentsWithSensors.includes(seg.rfid),
      );
      segmentsForWhichWeNeedToGenerateMeasurements.forEach((seg) => {
        const measurement = {
          guid: uuidv4(),
          rfid: seg.rfid,
          datetime: new Date().toISOString(),
          uv: this.approximationService.calculateUV(
            segmentsForWhichWeDoNotNeedToGenerateMeasurements,
            lastFourMeasurementsFromDifferentSensors.map(
              (val: MeasurementData) => ({ rfid: val.rfid, uv: val.uv }),
            ),
            seg,
          ),
          light: this.approximationService.calculateLux(
            segmentsForWhichWeDoNotNeedToGenerateMeasurements,
            lastFourMeasurementsFromDifferentSensors.map(
              (val: MeasurementData) => ({ rfid: val.rfid, lux: val.light }),
            ),
            seg,
          ),
          temperature: this.approximationService.calculateTemperature(
            segmentsForWhichWeDoNotNeedToGenerateMeasurements,
            lastFourMeasurementsFromDifferentSensors.map(
              (val: MeasurementData) => ({
                rfid: val.rfid,
                temperature: val.temperature,
              }),
            ),
            seg,
          ),
          humidity: this.approximationService.calculateHumidity(
            segmentsForWhichWeDoNotNeedToGenerateMeasurements,
            lastFourMeasurementsFromDifferentSensors.map(
              (val: MeasurementData) => ({
                rfid: val.rfid,
                humidity: val.humidity,
              }),
            ),
            seg,
          ),
          isApproximated: true,
        };

        this.measurementRepository.insert(measurement).then(() => {
          this.measurementGateway.handleMeasurementUpdate(measurement);
        });
      });
    });
  }
}
