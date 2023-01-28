import {Module} from "@nestjs/common";
import {SubTaskGateway} from "../Gateways/SubTaskGateway";

@Module({
    providers: [
        SubTaskGateway
    ]
})
export class SubTaskWebSocketModule {
}
