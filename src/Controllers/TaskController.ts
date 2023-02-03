import {Controller, Get, Post, Put, Body, Delete, Req, Param, Query} from "@nestjs/common";

import {CreateRequest} from "../Requests/TaskController/CreateRequest";
import {TaskService} from "../Services/TaskService";

@Controller("task")
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {

    }

    @Post("create")
    create(@Req() request, @Body() CreateRequest: CreateRequest) {
        return this.taskService.create(
            request.user.id,
            CreateRequest.boardId,
            CreateRequest.name
        );
    }
}
