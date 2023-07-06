import { User } from "core/domain/entities/user/User";
import { UserRepository } from "core/domain/repositories/UserRepository";
import {Storage} from '@google-cloud/storage';

export class firebaseStorageRepository implements UserRepository {

    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}