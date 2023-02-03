import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BoardModel} from "../Models/TypeOrm/BoardModel";
import {ProjectModel} from "../Models/TypeOrm/ProjectModel";
import {TaskModel} from "../Models/TypeOrm/TaskModel";
import {TaskPriorityModel} from "../Models/TypeOrm/TaskPriorityModel";
import {TaskService} from "../Services/TaskService";
import {TaskController} from "../Controllers/TaskController";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TaskModel,
            BoardModel,
            ProjectModel,
            TaskPriorityModel
        ])
    ],
    providers: [
        TaskService
    ],
    controllers: [
        TaskController
    ],
    exports: [
        TaskService
    ],
})
export class TaskModule {
}
