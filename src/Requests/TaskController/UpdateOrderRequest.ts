import {IsNotEmpty} from "class-validator";

export class UpdateOrderRequest {
    @IsNotEmpty()
    tasks: []
}