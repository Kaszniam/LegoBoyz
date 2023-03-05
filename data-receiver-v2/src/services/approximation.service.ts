import { Injectable } from '@nestjs/common';
import { Segment } from '../entities/segment.entity';

@Injectable()
export class ApproximationService {
  calculateUV(
    sensoredSegments: Segment[],
    measuredValues: { rfid: string; uv: number }[],
    approximatedSegment: Segment,
  ): number {
    const uvDataWithDistance = sensoredSegments.map((seg) => {
      const uvValue = measuredValues.find((val) => val.rfid == seg.rfid).uv;
      const distance =
        (((seg.x - approximatedSegment.x) ^ 2) +
          ((seg.y - approximatedSegment.y) ^ 2) +
          ((seg.z - approximatedSegment.z) ^ 2)) ^
        (1 / 2);
      return [uvValue, distance];
    });
    let uvApproximation = 0;
    uvDataWithDistance.forEach(
      (data) => (uvApproximation += data[0] - 5 * (data[1] / 1000)),
    );
    return uvApproximation / 2;
  }

  calculateTemperature(
    sensoredSegments: Segment[],
    measuredValues: { rfid: string; temperature: number }[],
    approximatedSegment: Segment,
  ): number {
    const temperatureDataWithDistance = sensoredSegments.map((seg) => {
      const temperatureValue = measuredValues.find(
        (val) => val.rfid == seg.rfid,
      ).temperature;
      const distance =
        (((seg.x - approximatedSegment.x) ^ 2) +
          ((seg.y - approximatedSegment.y) ^ 2) +
          ((seg.z - approximatedSegment.z) ^ 2)) ^
        (1 / 2);
      return [temperatureValue, distance];
    });
    let temperatureApproximation = 0;
    temperatureDataWithDistance.forEach(
      (data) => (temperatureApproximation += data[0] - data[1] / 1000),
    );
    return temperatureApproximation / 2;
  }

  calculateLux(
    sensoredSegments: Segment[],
    measuredValues: { rfid: string; lux: number }[],
    approximatedSegment: Segment,
  ): number {
    const uvDataWithDistance = sensoredSegments.map((seg) => {
      const uvValue = measuredValues.find((val) => val.rfid == seg.rfid).lux;
      const distance =
        (((seg.x - approximatedSegment.x) ^ 2) +
          ((seg.y - approximatedSegment.y) ^ 2) +
          ((seg.z - approximatedSegment.z) ^ 2)) ^
        (1 / 2);
      return [uvValue, distance];
    });
    let luxApproximation = 0;
    uvDataWithDistance.forEach(
      (data) => (luxApproximation += data[0] - 10 * (data[1] / 1000)),
    );
    return luxApproximation / 2;
  }

  calculateHumidity(
    sensoredSegments: Segment[],
    measuredValues: { rfid: string; humidity: number }[],
    approximatedSegment: Segment,
  ): number {
    const uvDataWithDistance = sensoredSegments.map((seg) => {
      const uvValue = measuredValues.find(
        (val) => val.rfid == seg.rfid,
      ).humidity;
      const distance =
        (((seg.x - approximatedSegment.x) ^ 2) +
          ((seg.y - approximatedSegment.y) ^ 2) +
          ((seg.z - approximatedSegment.z) ^ 2)) ^
        (1 / 2);
      return [uvValue, distance];
    });
    let humidityApproximation = 0;
    uvDataWithDistance.forEach(
      (data) => (humidityApproximation += data[0] - 0.5 * (data[1] / 1000)),
    );
    return humidityApproximation / 2;
  }
}
