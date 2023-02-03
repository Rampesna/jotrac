import {MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import dataSourceOptions from "../Config/TypeOrmConfig";
import {UserModule} from "../Modules/UserModule";
import {JwtModel} from "../Models/TypeOrm/JwtModel";
import {JwtService} from "../Services/JwtService";
import {AuthMiddleware} from "../Middlewares/AuthMiddleware";
import {ProjectModule} from "../Modules/ProjectModule";
import {WebSocketModule} from "../WebSocket/Core/WebSocketModule";
import {BoardModule} from "../Modules/BoardModule";
import {TaskModule} from "../Modules/TaskModule";

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([
            JwtModel
        ]),
        ConfigModule.forRoot(),
        UserModule,
        ProjectModule,
        BoardModule,
        TaskModule,
        WebSocketModule
    ],
    providers: [
        JwtService
    ]
})

export class App implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(
            AuthMiddleware
        ).exclude(
            {
                path: "api/user/auth/login",
                method: RequestMethod.POST
            }
        ).forRoutes("*");
    }
}
