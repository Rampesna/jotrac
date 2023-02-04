import {IsNotEmpty} from "class-validator";

export class UpdateRequest {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;
}
