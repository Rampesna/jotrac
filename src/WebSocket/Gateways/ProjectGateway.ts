import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway(3001)
export class ProjectGateway {
    @WebSocketServer()
    private server;

    @SubscribeMessage('message')
    handleEvent(client, data): void {
        console.log(client)
        console.log(data)

        this.server.emit('message', {
            test: 'Data'
        });
        // this.server.emit("onProjectUpdate", data);
    }
}
