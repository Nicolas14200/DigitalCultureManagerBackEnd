import { BcryptPasswordGateway } from "../../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { User } from "../../domain/entities/User";
import { Role } from "../../domain/valueObjects/Role";
import { UpdateUser } from "../../usecase/user/UpdateUser";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";

describe('Unit - UpdateUser', () => {
    let userRepo: InMemoryUserRepository;
    let bcryptPasswordGateway: BcryptPasswordGateway;
    let user: User;
    let updateUser: UpdateUser;
    beforeAll(() => {
        userRepo = new InMemoryUserRepository(new Map());
        bcryptPasswordGateway = new BcryptPasswordGateway()
        user = User.create({
            email:"ben@yopmail.com",
            name:"BEN",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
    })
    it("Should Update a User", async () => {
        const userUpdate = updateUser.execute({
            id:user.userProperty.id,
            name:"ELO",
            password:"N0uvoPass0rd123456",
        })
        
    })
})