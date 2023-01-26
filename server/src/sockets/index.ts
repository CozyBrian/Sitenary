import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const SocketHandler = (socket:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  console.log(`a user Connected - ${socket.id}`);

};

export default SocketHandler;