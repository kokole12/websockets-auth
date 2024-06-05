import { Socket } from 'socket.io';
import { WsJwtGuard } from './ws-jwt.guard';

export type SocketIOMw = {
  (client: Socket, next: (err?: Error) => void);
};
export const socketAuthMw = (): SocketIOMw => {
  return (client, next) => {
    try {
      WsJwtGuard.validateToken(client);
      next();
    } catch (error) {
      next(error);
    }
  };
};
