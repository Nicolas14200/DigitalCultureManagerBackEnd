import { User } from "../entities/user/User";

export interface UserRepository {
    save(user: User): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getById(id: string) : Promise <User>;

} 