import {IsNotEmpty} from "class-validator";

export class GetByIdRequest {
    @IsNotEmpty()
    id: number;
}
