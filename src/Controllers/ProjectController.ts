import {Controller, Get, Post, Put, Body, Delete, Req, Param, Query} from "@nestjs/common";

import {ProjectService} from "../Services/ProjectService";
import {GetByIdRequest} from "../Requests/ProjectController/GetByIdRequest";
import {CreateRequest} from "../Requests/ProjectController/CreateRequest";
import ServiceResponse from "../Utils/ServiceResponse";

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

    @Get("getById")
    getById(@Req() request, @Query() GetByIdRequest: GetByIdRequest) {
        return this.projectService.getProjectById(
            GetByIdRequest.id,
            request.user.id
        );
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
