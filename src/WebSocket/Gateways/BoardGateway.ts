import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway(3001)
export class BoardGateway {
    @WebSocketServer()
    private server;

    @SubscribeMessage('updateBoard')
    updateBoard(client, data): void {
        console.log('updateBoard');

        this.server.emit('onBoardUpdate');
    }
}
