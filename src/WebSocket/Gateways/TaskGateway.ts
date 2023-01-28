import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway(3001)
export class TaskGateway {
    @WebSocketServer()
    private server;

    @SubscribeMessage('updateTask')
    updateTask(client, data): void {
        console.log(data)

        this.server.emit('onTaskUpdate', {
            test: 'onTaskUpdate'
        });
    }
}
