import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserModel} from "../Models/TypeOrm/UserModel";

import {GetAllRequest} from "../Requests/UserController/GetAllRequest";
import {GetByIdRequest} from "../Requests/UserController/GetByIdRequest";
import {CreateRequest} from "../Requests/UserController/CreateRequest";
import {RegisterRequest} from "../Requests/UserController/RegisterRequest";
import {UpdateRequest} from "../Requests/UserController/UpdateRequest";
import {DeleteRequest} from "../Requests/UserController/DeleteRequest";
import {TypeOrmQueryService} from "@nestjs-query/query-typeorm";
import ServiceResponse from "../Utils/ServiceResponse";
import {sign} from "jsonwebtoken";
import {JwtService} from "./JwtService";

@Injectable()
export class UserService extends TypeOrmQueryService<UserModel> {

    constructor(
        @InjectRepository(UserModel)
        private userRepository: Repository<UserModel>,
        private jwtService: JwtService
    ) {
        super(userRepository, {
            useSoftDelete: true
        });
    }

    async login(
        email: string,
        password: string
    ) {
        let user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            if (user.password === password) {
                this.jwtService.create(
                    'user',
                    user.id.toString(),
                    null
                );

                return new ServiceResponse(
                    true,
                    "Login successful",
                    {
                        token: sign({
                            id: user.id,
                            email: user.email,
                            name: user.name
                        }, process.env.JWT_SECRET)
                    },
                    200
                );
            } else {
                return new ServiceResponse(
                    false,
                    "Incorrect password",
                    null,
                    400
                );
            }
        } else {
            return new ServiceResponse(
                false,
                "User not found",
                null,
                404
            );
        }
    }

    getAll() {
        return this.userRepository.find();
    }

    // @ts-ignore
    async getById(
        userId: number
    ) {
        let user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (user) {
            return new ServiceResponse(
                true,
                "User found",
                user,
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

    create(CreateRequest: CreateRequest) {
        return `Create user`;
    }

    register(RegisterRequest: RegisterRequest) {
        let user = new UserModel();
        user.name = RegisterRequest.name;
        user.email = RegisterRequest.email;
        user.password = RegisterRequest.password;

        return this.userRepository.save(user);
    }

    update(UpdateRequest: UpdateRequest) {
        return `Update user`;
    }

    delete(DeleteRequest: DeleteRequest) {
        return `Delete user`;
    }
}
