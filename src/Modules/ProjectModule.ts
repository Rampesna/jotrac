import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectController} from "../Controllers/ProjectController";
import {ProjectService} from "../Services/ProjectService";
import {ProjectModel} from "../Models/TypeOrm/ProjectModel";
import {UserModel} from "../Models/TypeOrm/UserModel";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectModel,
            UserModel
        ])
    ],
    providers: [
        ProjectService
    ],
    controllers: [
        ProjectController
    ],
    exports: [
        ProjectService
    ],
})
export class ProjectModule {
}
