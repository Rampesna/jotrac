import {IsNotEmpty} from "class-validator";

export class RegisterRequest {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}
