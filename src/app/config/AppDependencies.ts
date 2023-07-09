import { UserController } from "../../app/modules/users/UserController";
import { BcryptPasswordGateway } from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { MongoDbUserRepository } from "../../adapters/repositories/mongoDb/MongoDbUserRepository";
import { DCMIdentifiers } from "../../core/usecase/DCMIdentifiers";
import { CreateUser } from "../../core/usecase/user/CreateUser";
import { Container } from "inversify";
import admin from "firebase-admin";
import { UpdateUser } from "../../core/usecase/user/UpdateUser";
import { PlotController } from "../../app/modules/plot/PlotController";
import { CreatePlot } from "../../core/usecase/plot/CreatePlot";
import { GetUserById } from "../../core/usecase/user/GetUserById";
import { DeleteUser } from "../../core/usecase/user/DeleteUser";
import { UpdatePlot } from "../../core/usecase/plot/UpdatePlot";
import { MongoDbPlotRepository } from "../../adapters/repositories/mongoDb/MongoDbPlotRepository";
const serviceAccount = require("./digital-culture-manager-firebase-adminsdk-ajq5q-3f4899c476.json")

export class AppDependencies extends Container {
    init(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
            });
        this.bind(DCMIdentifiers.userRepository).toConstantValue(new MongoDbUserRepository())
        this.bind(DCMIdentifiers.passwordGateway).toConstantValue(new BcryptPasswordGateway())
        this.bind(DCMIdentifiers.plotRepository).toConstantValue(new MongoDbPlotRepository())
        this.bind(CreateUser).toSelf()
        this.bind(UpdateUser).toSelf()
        this.bind(UserController).toSelf()
        this.bind(PlotController).toSelf()
        this.bind(CreatePlot).toSelf()
        this.bind(GetUserById).toSelf()
        this.bind(DeleteUser).toSelf()
        this.bind(UpdatePlot).toSelf()
        return this;
    }
}