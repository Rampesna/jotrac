import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TypeOrmQueryService} from "@nestjs-query/query-typeorm";
import ServiceResponse from "../Utils/ServiceResponse";
import {ProjectModel} from "../Models/TypeOrm/ProjectModel";
import {UserModel} from "../Models/TypeOrm/UserModel";

@Injectable()
export class ProjectService extends TypeOrmQueryService<ProjectModel> {

    constructor(
        @InjectRepository(ProjectModel)
        private projectRepository: Repository<ProjectModel>,
        @InjectRepository(UserModel)
        private userRepository: Repository<UserModel>
    ) {
        super(projectRepository, {
            useSoftDelete: true
        });
    }

    async getByUserId(
        userId: number
    ) {
        let user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: [
                'projects'
            ]
        });

        if (user) {
            return new ServiceResponse(
                true,
                "Projects",
                user.projects,
                200
            );
        } else {
            return new ServiceResponse(
                false,
                "User not found",
                null,
                404
            );
        }
    }

    async getProjectById(
        projectId: number,
        userId: number
    ) {
        let project = await this.projectRepository.findOne({
            where: {
                id: projectId
            },
            relations: [
                'users',
                'status',
            ]
        });

        if (project) {
            let user = project.users.find(user => user.id === userId);

            if (user) {
                return new ServiceResponse(
                    true,
                    "Project",
                    project,
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
        name: string,
        startDate?: Date,
        endDate?: Date,
        description?: string,
    ) {
        let user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (user) {
            let project = new ProjectModel();
            project.name = name;
            project.start_date = startDate;
            project.end_date = endDate;
            project.description = description;
            project.users = [user];

            let createdProject = await this.projectRepository.save(project);


            return new ServiceResponse(
                true,
                "Project created",
                createdProject,
                201
            );
        } else {
            return new ServiceResponse(
                false,
                "User not found",
                null,
                404
            );
        }
    }
}
