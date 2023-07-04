import mongoose from "mongoose";
import { User } from "../../core/domain/entities/User";
import { Role } from "../../core/domain/valueObjects/Role";
import { MongoDbUserRepository } from "../repositories/MongoDbUserRepository"
import { v4 } from "uuid";
describe('Integration - MongoDbUserRepository', () => {
    let userRepo : MongoDbUserRepository;
    let user : User;
    beforeAll(async ()=>{
        userRepo = new MongoDbUserRepository();
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        user = User.create({
            email:`benjamin${v4()}@yopmaiol.com`,
            name:"Ban",
            password:"azzearrt4522787",
            role:Role.admin,
        })
    })
    it("should save a user in a mnogodb repository", async () => {
        await userRepo.save(user);
        const userExist: User = await userRepo.getById(user.userProperty.id)
        expect(userExist.userProperty.name).toEqual("Ban")
    })
    it("should return a user via is email", async () => {
        const userExist: User = await userRepo.getByEmail(user.userProperty.email)
        expect(userExist.userProperty.name).toEqual("Ban")
    })
})