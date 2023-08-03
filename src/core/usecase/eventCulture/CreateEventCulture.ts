import { Identity } from "core/domain/valueObjects/Identitty";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { PlotRepository } from "core/domain/repositories/PlotRepository";

export interface CreateEventCultureProps {
    note: string;
    plotId: string;
}

@injectable()
export class CreateEventCulture implements Usecase<CreateEventCultureProps, EventCulture>{

    constructor(
        @inject(DCMIdentifiers.eventCultureRepository)
        private readonly _eventCultureRepository : EventCultureRepository,
        @inject(DCMIdentifiers.plotRepository)
        private readonly _plotRepository : PlotRepository
        ){}

    async execute(payload: CreateEventCultureProps): Promise<EventCulture> {
        const eventCulture = EventCulture.create(payload);
        await this._eventCultureRepository.save(eventCulture);
        const plot = await this._plotRepository.getById(payload.plotId);
        plot.addEventCulture(eventCulture);
        await this._plotRepository.save(plot);
        return eventCulture;
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "PROLO") {
            return true;
        }
        return false;
    }
}