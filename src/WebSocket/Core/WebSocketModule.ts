import {Module} from "@nestjs/common";
import {ProjectWebSocketModule} from "../Modules/ProjectWebSocketModule";
import {BoardWebSocketModule} from "../Modules/BoardWebSocketModule";
import {TaskWebSocketModule} from "../Modules/TaskWebSocketModule";
import {SubTaskGateway} from "../Gateways/SubTaskGateway";

@Module({
    imports: [
        ProjectWebSocketModule,
        BoardWebSocketModule,
        TaskWebSocketModule,
        SubTaskGateway
    ],
    providers: []
})
export class WebSocketModule {
}
