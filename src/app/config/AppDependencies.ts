import { UserController } from "../../app/modules/users/UserController";
import { BcryptPasswordGateway } from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { MongoDbUserRepository } from "../../adapters/repositories/mongoDb/MongoDbUserRepository";
import { DCMIdentifiers } from "../../core/usecase/DCMIdentifiers";
import { CreateUser } from "../../core/usecase/user/CreateUser";
import { Container } from "inversify";
import admin from "firebase-admin";
const serviceAccount = require("./digital-culture-manager-firebase-adminsdk-ajq5q-3f4899c476.json")

export class AppDependencies extends Container {
    init(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
            });
        this.bind(DCMIdentifiers.userRepository).toConstantValue(new MongoDbUserRepository())
        this.bind(DCMIdentifiers.passwordGateway).toConstantValue(new BcryptPasswordGateway())
        this.bind(CreateUser).toSelf()
        this.bind(UserController).toSelf()
        return this;
    }
}