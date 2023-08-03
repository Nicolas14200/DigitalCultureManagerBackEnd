import { UserError } from "../../../../core/domain/models/errors/UserError";
import { User } from "../../../domain/entities/user/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {

    constructor(readonly userMap: Map < string, User > ){
    }

    async getById(id: string): Promise<User> {
            const user: User = this.userMap.get(id)
            if (!user) {
                throw new UserError.GetByIdFailed("USER_NOT_FOUND")
              }
            return user;
    }

    async save(user: User): Promise<User> {
        this.userMap.set(user.props.id, user);
        return user;
    }

    async getByEmail(email: string): Promise<User> {
            for (let [id, user] of this.userMap){
                if (user.props.email === email){
                    return this.userMap.get(id);
                }
            }
            throw new UserError.GetByEmailFailed("USER_NOT_FOUND")
        }

    async delete(id: string): Promise<void> {
        this.userMap.delete(id);
        }
    }

