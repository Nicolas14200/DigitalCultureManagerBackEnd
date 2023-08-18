import dotenv from 'dotenv';
dotenv.config();
import { UserController } from "../../app/modules/users/UserController";
import { BcryptPasswordGateway } from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { MongoDbUserRepository } from "../../adapters/repositories/mongoDb/MongoDbUserRepository";
import { DCMIdentifiers } from "../../core/usecase/DCMIdentifiers";
import { CreateUser } from "../../core/usecase/user/CreateUser";
import { Container } from "inversify";
import { UpdateUser } from "../../core/usecase/user/UpdateUser";
import { PlotController } from "../../app/modules/plot/PlotController";
import { CreatePlot } from "../../core/usecase/plot/CreatePlot";
import { GetUserById } from "../../core/usecase/user/GetUserById";
import { DeleteUser } from "../../core/usecase/user/DeleteUser";
import { UpdatePlot } from "../../core/usecase/plot/UpdatePlot";
import { MongoDbPlotRepository } from "../../adapters/repositories/mongoDb/MongoDbPlotRepository";
import { DeletePlot } from "../../core/usecase/plot/DeletePlot";
import { GetPlotById } from "../../core/usecase/plot/GetPlotById";
import { EventCultureController } from "../../app/modules/eventCulture/EventCultureController";
import { CreateEventCulture } from "../../core/usecase/eventCulture/CreateEventCulture";
import { MongoDbEventCultureRepository } from "../../adapters/repositories/mongoDb/MongoDbEventCultureRepository";
import { GetEventsCulturesByPlotId } from "../../core/usecase/eventCulture/GetEventsCulturesByPlotId";
import { GetEventCultureById } from "../../core/usecase/eventCulture/GetEventCultureById";
import { DeleteEventCulture } from "../../core/usecase/eventCulture/DeleteEventCulture";
import { UpdateEventCulture } from "../../core/usecase/eventCulture/UpdateEventCulture";
import { AddSeriesToPlot } from "../../core/usecase/plot/AddSeriesToPlot";
import { AddSubPlot } from "../../core/usecase/plot/AddSubPlot";
import { JwtIdentityGateway } from "../../adapters/gateways/jwt/JwtIdentityGateway";

export class AppDependencies extends Container {
    init(){
        this.bind(DCMIdentifiers.passwordGateway).toConstantValue(new BcryptPasswordGateway())
        this.bind(DCMIdentifiers.userRepository).toConstantValue(new MongoDbUserRepository())
        this.bind(DCMIdentifiers.eventCultureRepository).toConstantValue(new MongoDbEventCultureRepository())
        this.bind(DCMIdentifiers.plotRepository).toConstantValue(new MongoDbPlotRepository())
        this.bind(DCMIdentifiers.identityGateway).toConstantValue(new JwtIdentityGateway(process.env.JWT_KEY))

        this.bind(UserController).toSelf()
        this.bind(CreateUser).toSelf()
        this.bind(UpdateUser).toSelf()
        this.bind(GetUserById).toSelf()
        this.bind(DeleteUser).toSelf()

        this.bind(PlotController).toSelf()
        this.bind(CreatePlot).toSelf()
        this.bind(UpdatePlot).toSelf()
        this.bind(DeletePlot).toSelf()
        this.bind(GetPlotById).toSelf()
        this.bind(AddSeriesToPlot).toSelf()
        this.bind(AddSubPlot).toSelf()

        this.bind(EventCultureController).toSelf()
        this.bind(CreateEventCulture).toSelf()
        this.bind(GetEventCultureById).toSelf()
        this.bind(GetEventsCulturesByPlotId).toSelf()
        this.bind(DeleteEventCulture).toSelf()
        this.bind(UpdateEventCulture).toSelf()
        return this;
    }
}