import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
    constructor(readonly userMap: Map < string, User > ){
    }
    async getById(id: string): Promise<User> {
            const user: User = this.userMap.get(id)
            if (!user) {
                throw new Error("USER_NOT_FOUND")
              }
            return this.userMap.get(id);
    
    }
    async save(user: User): Promise<User> {
        this.userMap.set(user.userProperty.id, user);
        return user
    }
    async getByEmail(email: string): Promise<User> {
            for (let [id, user] of this.userMap){
                if (user.userProperty.email === email){
                    return this.userMap.get(id);
                }
            }
        }
    }
