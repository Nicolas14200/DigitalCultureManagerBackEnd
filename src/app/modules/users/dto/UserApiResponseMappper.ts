import { Mapper } from "../../../../core/domain/Mapper";
import { User } from "../../../../core/domain/entities/user/User";
import { UserResponse } from "../../../../core/domain/entities/apiResponse/UserResponse";

export class UserApiResponseMapper implements Mapper< User, UserResponse > {
    fromDomain(user: User): UserResponse {
        return {
            email: user.userProperty.email,
            name: user.userProperty.name,
            password: user.userProperty.password,
            role: user.userProperty.role
        }
    }
}