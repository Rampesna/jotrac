import {Module} from "@nestjs/common";
import {ProjectGateway} from "../Gateways/ProjectGateway";

@Module({
    providers: [
        ProjectGateway
    ]
})
export class ProjectWebSocketModule {
}
