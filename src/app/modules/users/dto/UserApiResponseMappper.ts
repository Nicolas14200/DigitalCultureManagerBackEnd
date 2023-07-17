import { Mapper } from "../../../../core/domain/Mapper";
import { User } from "../../../../core/domain/entities/user/User";
import { UserResponse } from "../../../../core/domain/entities/apiResponse/UserResponse";

export class UserApiResponseMapper implements Mapper< User, UserResponse > {
    fromDomain(user: User): UserResponse {
        return {
            email: user.props.email,
            name: user.props.name,
            password: user.props.password,
            role: user.props.role
        }
    }
}