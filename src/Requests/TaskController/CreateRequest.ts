import {IsNotEmpty} from "class-validator";

export class CreateRequest {
    @IsNotEmpty()
    boardId: number;

    @IsNotEmpty()
    name: string;
}
