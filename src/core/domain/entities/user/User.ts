import { UpdateUserProps } from "../../../usecase/user/UpdateUser";
import { Email } from "../../valueObjects/Email";
import { Role } from "../../valueObjects/Role";
import { v4 } from 'uuid';

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export class User {
    userProperty: UserProps
    constructor(userProperty: UserProps){
        this.userProperty = userProperty
    }

    static create(props: {
        name: string;
        email: string;
        password: string;
        role: Role;
    })
    {
        return new User({
            id:v4(),
            email: new Email(props.email).value,
            name:props.name,
            password:props.password,
            role:props.role,
        })
    }
    update(payload: UpdateUserProps ){
        this.userProperty.name = payload.name,
        this.userProperty.password = payload.password
    }
}