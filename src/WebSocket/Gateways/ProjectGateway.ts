import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway(3001)
export class ProjectGateway {
    @WebSocketServer()
    private server;

    @SubscribeMessage('updateProject')
    updateProject(client, data): void {
        console.log(data)

        this.server.emit('onProjectUpdate', {
            test: 'onProjectUpdate'
        });
    }

    projectCreated() {
        this.server.emit('onProjectCreated', {
            test: 'onProjectCreated'
        });
    }
}
