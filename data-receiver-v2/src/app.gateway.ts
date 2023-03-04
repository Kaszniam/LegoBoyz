import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  MessageBody,
} from '@nestjs/websockets';
import { MeasurementData } from './data/measurement';
import { MeasurementService } from './services/measurement.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection
{
  private logger: Logger = new Logger('AppGateWay');
  private measurementService: MeasurementService;

  constructor(measurementService: MeasurementService) {
    this.measurementService = measurementService;
  }

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('MeasurementUpdate')
  handleMeasurementUpdate(@MessageBody() payload: string): string {
    const data = JSON.parse(payload) as MeasurementData;
    this.measurementService.insert(data);
    return `Inserted successfully`;
  }
}
