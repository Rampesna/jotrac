import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BoardController} from "../Controllers/BoardController";
import {BoardService} from "../Services/BoardService";
import {BoardModel} from "../Models/TypeOrm/BoardModel";
import {ProjectModel} from "../Models/TypeOrm/ProjectModel";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardModel,
            ProjectModel
        ])
    ],
    providers: [
        BoardService
    ],
    controllers: [
        BoardController
    ],
    exports: [
        BoardService
    ],
})
export class BoardModule {
}
