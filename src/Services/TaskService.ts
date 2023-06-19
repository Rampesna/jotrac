import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TypeOrmQueryService} from "@nestjs-query/query-typeorm";
import ServiceResponse from "../Utils/ServiceResponse";
import {BoardModel} from "../Models/TypeOrm/BoardModel";
import {UserModel} from "../Models/TypeOrm/UserModel";
import {ProjectModel} from "../Models/TypeOrm/ProjectModel";
import {TaskModel} from "../Models/TypeOrm/TaskModel";
import {TaskPriorityModel} from "../Models/TypeOrm/TaskPriorityModel";

@Injectable()
export class TaskService extends TypeOrmQueryService<TaskModel> {

    constructor(
        @InjectRepository(TaskModel)
        private taskRepository: Repository<TaskModel>,
        @InjectRepository(BoardModel)
        private boardRepository: Repository<BoardModel>,
        @InjectRepository(ProjectModel)
        private projectRepository: Repository<ProjectModel>,
        @InjectRepository(TaskPriorityModel)
        private taskPriorityRepository: Repository<TaskPriorityModel>,
    ) {
        super(taskRepository, {
            useSoftDelete: true,
        });
    }

    async create(
        userId: number,
        boardId: number,
        name: string
    ) {
        let board = await this.boardRepository.findOne({
            where: {
                id: boardId
            },
            relations: [
                'project'
            ]
        });

        if (board) {
            let project = await this.projectRepository.findOne({
                where: {
                    id: board.project.id
                },
                relations: [
                    'users'
                ]
            });

            if (project) {
                let user = project.users.find(user => user.id === userId);
                if (user) {
                    let lastOrderedTask = await this.taskRepository.findOne({
                        where: {
                            board: {
                                id: boardId
                            }
                        },
                        order: {
                            order: 'DESC'
                        }
                    });
                    let order = lastOrderedTask ? lastOrderedTask.order + 1 : 1;
                    let task = new TaskModel();
                    task.name = name;
                    task.order = order;
                    task.description = "";
                    task.board = board;
                    task.priority = await this.taskPriorityRepository.findOne({
                        where: {
                            id: 1
                        }
                    });
                    task.created_at = new Date();
                    task.updated_at = new Date();
                    await this.taskRepository.save(task);

                    return new ServiceResponse(
                        true,
                        "Task created",
                        task,
                        201
                    );
                } else {
                    return new ServiceResponse(
                        false,
                        "You are not a member of this project",
                        null,
                        404
                    );
                }
            } else {
                return new ServiceResponse(
                    false,
                    "Project not found",
                    null,
                    404
                );
            }
        } else {
            return new ServiceResponse(
                false,
                "Board not found",
                null,
                404
            );
        }
    }

    async updateOrder(
        userId: number,
        tasks: []
    ) {
        let oneTask = await this.taskRepository.findOne({
            where: {
                // @ts-ignore
                id: tasks[0].taskId
            },
            relations: [
                'board',
                'board.project',
                'board.project.users'
            ]
        });

        if (!oneTask) {
            return new ServiceResponse(
                false,
                "Task not found",
                null,
                404
            );
        }

        let user = oneTask.board.project.users.find(user => user.id === userId);
        if (!user) {
            return new ServiceResponse(
                false,
                "You are not a member of this project",
                null,
                404
            );
        }

        for (const task of tasks) {
            // @ts-ignore
            await this.taskRepository.update({id: task.taskId}, {order: task.order, board: {id: task.boardId}});
        }
    }
}
