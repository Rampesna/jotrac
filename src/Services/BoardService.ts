import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TypeOrmQueryService} from "@nestjs-query/query-typeorm";
import ServiceResponse from "../Utils/ServiceResponse";
import {BoardModel} from "../Models/TypeOrm/BoardModel";
import {ProjectModel} from "../Models/TypeOrm/ProjectModel";

@Injectable()
export class BoardService extends TypeOrmQueryService<BoardModel> {

    constructor(
        @InjectRepository(BoardModel)
        private boardRepository: Repository<BoardModel>,
        @InjectRepository(ProjectModel)
        private projectRepository: Repository<ProjectModel>
    ) {
        super(boardRepository, {
            useSoftDelete: true,
        });
    }

    async getByUserIdAndProjectIdWithTasks(
        userId: number,
        projectId: number
    ) {
        let project = await this.projectRepository.findOne({
            where: {
                id: projectId
            },
            relations: [
                'users'
            ]
        });

        if (project) {
            let user = project.users.find(user => user.id === userId);
            if (user) {
                // NOTE: Can use this method to get the boards with tasks and subtasks
                //
                // let boards = await this.boardRepository
                //     .createQueryBuilder('board')
                //     .leftJoinAndSelect('board.tasks', 'task')
                //     .leftJoinAndSelect('task.subTasks', 'subTask')
                //     .where('board.project.id = :projectId', { projectId })
                //     .getMany();
                let boards = await this.boardRepository.find({
                    where: {
                        project: {
                            id: projectId
                        }
                    },
                    relations: [
                        'tasks'
                    ],
                    order: {
                        order: 'ASC'
                    }
                });

                return new ServiceResponse(
                    true,
                    "Boards",
                    boards,
                    200
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
    }

    async create(
        userId: number,
        projectId: number
    ) {
        let project = await this.projectRepository.findOne({
            where: {
                id: projectId
            },
            relations: [
                'users'
            ]
        });

        if (project) {
            let user = project.users.find(user => user.id === userId);
            if (user) {
                let lastOrderedBoard = await this.boardRepository.findOne({
                    where: {
                        project: {
                            id: projectId
                        }
                    },
                    order: {
                        order: 'DESC'
                    }
                });
                let order = lastOrderedBoard ? lastOrderedBoard.order + 1 : 1;
                let board = new BoardModel();
                board.name = '';
                board.order = order;
                board.project = project;
                board.created_at = new Date();
                board.updated_at = new Date();

                let savedBoard = await this.boardRepository.save(board);

                if (savedBoard) {
                    return new ServiceResponse(
                        true,
                        "Board created",
                        savedBoard,
                        200
                    );
                } else {
                    return new ServiceResponse(
                        false,
                        "Board could not be created",
                        null,
                        500
                    );
                }
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
    }

    async update(
        userId: number,
        boardId: number,
        name: string
    ) {
        let board = await this.boardRepository.findOne({
            where: {
                id: boardId
            },
            relations: [
                'project',
                'project.users'
            ]
        });

        if (board) {
            let user = board.project.users.find(user => user.id === userId);
            if (user) {
                board.name = name;
                board.updated_at = new Date();

                let savedBoard = await this.boardRepository.save(board);

                if (savedBoard) {
                    return new ServiceResponse(
                        true,
                        "Board updated",
                        savedBoard,
                        200
                    );
                } else {
                    return new ServiceResponse(
                        false,
                        "Board could not be updated",
                        null,
                        500
                    );
                }
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
                "Board not found",
                null,
                404
            );
        }
    }

    async updateOrder(
        userId: number,
        boards: []
    ) {
        let oneBoard = await this.boardRepository.findOne({
            where: {
                // @ts-ignore
                id: boards[0].boardId
            },
            relations: [
                'project',
                'project.users'
            ]
        });

        if (!oneBoard) {
            return new ServiceResponse(
                false,
                "Board not found",
                null,
                404
            );
        }

        let user = oneBoard.project.users.find(user => user.id === userId);
        if (!user) {
            return new ServiceResponse(
                false,
                "You are not a member of this project",
                null,
                404
            );
        }

        for (const board of boards) {
            // @ts-ignore
            await this.boardRepository.update({id: board.boardId}, {order: board.order});
        }

        return new ServiceResponse(
            true,
            "Boards updated",
            null,
            200
        );
    }
}
