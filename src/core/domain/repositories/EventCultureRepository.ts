import { EventCulture } from "../entities/eventCulture/EventCulture";

export interface EventCultureRepository {
    save(eventCulture: EventCulture): Promise<EventCulture>;
    getById(id: string) : Promise <EventCulture>;
}