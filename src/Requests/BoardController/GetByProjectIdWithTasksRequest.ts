import {IsNotEmpty} from "class-validator";

export class GetByProjectIdWithTasksRequest {
    @IsNotEmpty()
    projectId: number;
}
