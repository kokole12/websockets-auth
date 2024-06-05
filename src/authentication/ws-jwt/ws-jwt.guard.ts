/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  logger = new Logger();
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    const { authorization } = client.handshake.headers;
    Logger.log({ authorization }, 'I got token');

    WsJwtGuard.validateToken(client);

    return true;
  }

  static validateToken(client: Socket) {
    const { authorization } = client.handshake.headers;
    const token = authorization.split(' ')[1];
    Logger.log(token);
  }
}
