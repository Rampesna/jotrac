import {Controller, Get, Post, Put, Body, Delete, Req} from "@nestjs/common";

import {ProjectService} from "../Services/ProjectService";
import {CreateRequest} from "../Requests/ProjectController/CreateRequest";

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

    @Post("create")
    create(@Req() request, @Body() CreateRequest: CreateRequest) {
        return this.projectService.create(
            request.user.id,
            CreateRequest.name,
            CreateRequest.startDate,
            CreateRequest.endDate,
            CreateRequest.description
        );
    }
}
