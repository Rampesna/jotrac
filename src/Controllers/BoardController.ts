import {Controller, Get, Post, Put, Body, Delete, Req, Query} from "@nestjs/common";

import {BoardService} from "../Services/BoardService";
import {GetByProjectIdWithTasksRequest} from "../Requests/BoardController/GetByProjectIdWithTasksRequest";
import {CreateRequest} from "../Requests/BoardController/CreateRequest";
import {UpdateRequest} from "../Requests/BoardController/UpdateRequest";
import {UpdateOrderRequest} from "../Requests/BoardController/UpdateOrderRequest";

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

    @Put("update")
    update(@Req() request, @Body() UpdateRequest: UpdateRequest) {
        return this.boardService.update(
            request.user.id,
            UpdateRequest.id,
            UpdateRequest.name
        );
    }

    @Put('updateOrder')
    updateOrder(@Req() request, @Body() UpdateOrderRequest: UpdateOrderRequest) {
        return this.boardService.updateOrder(
            request.user.id,
            UpdateOrderRequest.boards
        );
    }
}
