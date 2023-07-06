import { User } from "../../../core/domain/entities/user/User";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { UserModel } from "./models/UserModel";
import { MongoDbUserMappper, MongoDbUserMappperProps } from "./mappers/mongoDbUserMappper";

export class MongoDbUserRepository implements UserRepository {
    private mongoDbUserMappper: MongoDbUserMappper = new MongoDbUserMappper();
    async save(user: User): Promise<User> {
        await UserModel.findOneAndUpdate(
            {
                id: user.userProperty.id
            },
            {
                $set: {
                    email: user.userProperty.email,
                    id: user.userProperty.id,
                    name: user.userProperty.name,
                    password: user.userProperty.password,
                    role: user.userProperty.role,
                }
            },
            {
                upsert: true,
            }
        )
        return user;
    }
    async getByEmail(email: string): Promise<User> {
        const result: MongoDbUserMappperProps = await UserModel.findOne({
            email: email
        });
        if (result){
            return this.mongoDbUserMappper.toDomain(result);
        }  
    }
    async getById(id: string): Promise<User> {
        const result: MongoDbUserMappperProps = await UserModel.findOne({
            id: id
        });
        if (result){
            return this.mongoDbUserMappper.toDomain(result);
        }
    }
    
}