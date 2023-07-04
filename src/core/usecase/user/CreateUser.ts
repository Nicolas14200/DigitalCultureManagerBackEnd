import { inject, injectable } from "inversify";
import { User, UserProps } from "../../domain/entities/User";
import { PasswordGateway } from "../../domain/gateways/PasswordGateway";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { Identity } from "../../domain/valueObjects/Identitty";
import { Password } from "../../domain/valueObjects/Password";
import { Role } from "../../domain/valueObjects/Role";
import { Usecase } from "../Usecase";
import { DCMIdentifiers } from "../DCMIdentifiers";
export interface CreateUserProps  {
    name:string;
    email:string;
    password:string;
    role:Role;
}
@injectable()
export class CreateUser implements Usecase<CreateUserProps, User>{
    constructor(
        @inject(DCMIdentifiers.userRepository)
        private userRepository: UserRepository,
        @inject(DCMIdentifiers.passwordGateway)
        private passwordGateway: PasswordGateway
      ) {}
    async execute(payload: CreateUserProps): Promise<User> {
        const password = new Password(payload.password).value;
        const hash = await this.passwordGateway.encrypt(password);
        const userExist = await this.userRepository.getByEmail(payload.email);
        if (userExist){
            throw new Error("USER_EXIST");
        }
        const user = User.create({
           name:payload.name,
           email:payload.email,
           password:hash,
           role:payload.role, 
        });
        await this.userRepository.save(user);
        return user;
    }

}