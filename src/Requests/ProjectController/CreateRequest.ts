import {IsNotEmpty} from "class-validator";

export class CreateRequest {
    @IsNotEmpty()
    name: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
}
