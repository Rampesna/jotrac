import {Controller, Get, Post, Put, Body, Delete, Req, Param, Query} from "@nestjs/common";

import {BoardService} from "../Services/BoardService";
import {GetByProjectIdWithTasksRequest} from "../Requests/BoardController/GetByProjectIdWithTasksRequest";
import {CreateRequest} from "../Requests/BoardController/CreateRequest";

@Controller("board")
export class BoardController {
    constructor(
        private readonly boardService: BoardService
    ) {

    }

    @Get("getByProjectIdWithTasks")
    getById(@Req() request, @Query() GetByProjectIdWithTasksRequest: GetByProjectIdWithTasksRequest) {
        return this.boardService.getByUserIdAndProjectIdWithTasks(
            request.user.id,
            GetByProjectIdWithTasksRequest.projectId,
        );
    }

    @Post("create")
    create(@Req() request, @Body() CreateRequest: CreateRequest) {
        return this.boardService.create(
            request.user.id,
            CreateRequest.projectId
        );
    }
}
