import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Measurement } from '../entities/measurement.entity';

@WebSocketGateway({ cors: '*:*' })
export class MeasurementGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection
{
  private logger: Logger = new Logger('MeasurementGateWay');
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

  handleMeasurementUpdate(measurement: Measurement): string {
    if (!measurement.isApproximated) {
      this.server.emit('measurement-update', measurement);
    }
    this.server.emit(`measurement-${measurement.rfid}-update`, measurement);
    return `Measurement update event send!`;
  }
}
