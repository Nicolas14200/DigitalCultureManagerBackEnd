import { EventCulture } from "../entities/event/EventCulture";

export interface EventCultureRepository {
    save(eventCulture: EventCulture): Promise<EventCulture>;
    getById(id: string) : Promise <EventCulture>;
}