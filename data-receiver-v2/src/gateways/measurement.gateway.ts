import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { MeasurementData } from '../data/measurement';

@WebSocketGateway()
export class MeasurementGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection
{
  private logger: Logger = new Logger('AppGateWay');
  @WebSocketServer() private server: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`);
  }

  handleMeasurementUpdate(measurement: MeasurementData): string {
    this.server.emit('measurement-update', { measurement });
    return `Measurement update event send!`;
  }
}
