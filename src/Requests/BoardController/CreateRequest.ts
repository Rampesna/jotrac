import {IsNotEmpty} from "class-validator";

export class CreateRequest {
    @IsNotEmpty()
    projectId: number;
}
