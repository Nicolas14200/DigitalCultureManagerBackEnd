import { User } from "../../../core/domain/entities/user/User";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import mysql from "mysql2/promise";

export class MySqlDbUserRepository implements UserRepository {

    constructor(private readonly _connection: mysql.Connection){}

    async save(user: User): Promise<User> {
        await this._connection.execute(`
        INSERT INTO users (id, name, email, password, role) 
        VALUES (
            '${user.props.id}', 
            '${user.props.name}', 
            '${user.props.email}', 
            '${user.props.password}', 
            '${user.props.role}')
            `);
        return user
    }

    async getByEmail(email: string): Promise<User> {
        const [userData] = await this._connection.execute(`
        SELECT id, name, email, password, role
        FROM users
        WHERE email = '${email}'
        `)
        console.log("userData==========>", userData)
        const user = new User({
            id:userData[0].id, 
            name:userData[0].name, 
            email:userData[0].email, 
            password: userData[0].password, 
            role: userData[0].role
        });
        return user;
    }

    getById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}