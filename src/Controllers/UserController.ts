import {Controller, Get, Post, Put, Body, Delete, Req} from "@nestjs/common";
import {UserService} from "../Services/UserService";
import {LoginRequest} from "../Requests/UserController/LoginRequest";
// import {GetAllRequest} from "../Requests/UserController/GetAllRequest";
import {GetByIdRequest} from "../Requests/UserController/GetByIdRequest";
import {CreateRequest} from "../Requests/UserController/CreateRequest";
import {RegisterRequest} from "../Requests/UserController/RegisterRequest";
import {UpdateRequest} from "../Requests/UserController/UpdateRequest";
import {DeleteRequest} from "../Requests/UserController/DeleteRequest";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {

    }

    @Post("auth/login")
    login(@Body() LoginRequest: LoginRequest) {
        return this.userService.login(LoginRequest.email, LoginRequest.password);
    }

    @Get("getAll")
    getAll() {
        return this.userService.getAll();
    }

    @Get("getProfile")
    getProfile(@Req() request) {
        return this.userService.getById(request.user.id);
    }

    @Post("register")
    register(@Body() RegisterRequest: RegisterRequest) {
        return this.userService.register(RegisterRequest);
    }
}
