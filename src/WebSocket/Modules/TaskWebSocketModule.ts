import {Module} from "@nestjs/common";
import {TaskGateway} from "../Gateways/TaskGateway";

@Module({
    providers: [
        TaskGateway
    ]
})
export class TaskWebSocketModule {
}
