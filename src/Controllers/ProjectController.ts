import {Controller, Get, Post, Put, Body, Delete, Req} from "@nestjs/common";
import {UserService} from "../Services/UserService";

import {ProjectService} from "../Services/ProjectService";

@Controller("project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {

    }

    @Get("getByUser")
    getByUser(@Req() request) {
        return this.projectService.getByUserId(request.user.id);
    }
}
