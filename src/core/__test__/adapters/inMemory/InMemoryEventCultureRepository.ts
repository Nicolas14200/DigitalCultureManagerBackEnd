import { EventCulture } from "../../../../core/domain/entities/eventCulture/EventCulture";
import { EventCultureError } from "../../../../core/domain/models/errors/EventCultureError";
import { EventCultureRepository } from "../../../../core/domain/repositories/EventCultureRepository";

export class InMemoryEventCultureRepository implements EventCultureRepository {

    constructor(readonly eventCultureMap: Map < string, EventCulture > ){
    }
    async save(eventCulture: EventCulture): Promise<EventCulture> {
        this.eventCultureMap.set(eventCulture.props.id, eventCulture);     
        return eventCulture;
    }
    async getById(id: string): Promise<EventCulture> {
        const eventCulture: EventCulture = this.eventCultureMap.get(id)
        if (!eventCulture) {
            throw new EventCultureError.GetByIdFailed("EVENT_CULTURE_NOT_FOUND")
          }
        return this.eventCultureMap.get(id);
    }

}