import {Module} from "@nestjs/common";
import {BoardGateway} from "../Gateways/BoardGateway";

@Module({
    providers: [
        BoardGateway
    ]
})
export class BoardWebSocketModule {
}
