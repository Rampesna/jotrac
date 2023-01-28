import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway(3001)
export class SubTaskGateway {
    @WebSocketServer()
    private server;

    @SubscribeMessage('updateSubTask')
    updateSubTask(client, data): void {
        console.log(data)

        this.server.emit('onSubTaskUpdate', {
            test: 'onSubTaskUpdate'
        });
    }
}
