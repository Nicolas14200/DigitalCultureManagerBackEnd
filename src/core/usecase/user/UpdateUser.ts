import { User } from "../../../core/domain/entities/User";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { PasswordGateway } from "../../../core/domain/gateways/PasswordGateway";
import { Password } from "../../../core/domain/valueObjects/Password";

export interface UpdateUserProps {
    id: string;
    name:string;
    password:string;
}

@injectable()
export class UpdateUser implements Usecase<UpdateUserProps, User>{
    constructor(
        @inject(DCMIdentifiers.userRepository)
        private userRepository: UserRepository,
        @inject(DCMIdentifiers.passwordGateway)
        private passwordGateway: PasswordGateway
      ) {}
    async execute(payload: UpdateUserProps): Promise<User> {
        const user: User = await this.userRepository.getById(payload.id);
        const password = new Password(payload.password).value;
        const hash = await this.passwordGateway.encrypt(password);
        user.update({
            name: payload.name,
            password: hash,
            id: user.userProperty.id
        });
        this.userRepository.save(user);
        return user
    }

}