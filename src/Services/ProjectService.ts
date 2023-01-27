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
}

