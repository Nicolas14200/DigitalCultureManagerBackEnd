import { IsEmail, IsNumber, Length, } from "class-validator";
import { Role } from "../../../../core/domain/valueObjects/Role";

export class CreateUserCommand {
    @IsEmail()
    email: string;

    @Length(8, 30)
    password : string ;

    @Length(0, 30)
    name: string;

    @IsNumber()
    role: Role
}
