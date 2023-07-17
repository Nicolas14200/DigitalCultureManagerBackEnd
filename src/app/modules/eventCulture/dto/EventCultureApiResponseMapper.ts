import { EventCulture } from "core/domain/entities/eventCulture/EventCulture";
import { Mapper } from "../../../../core/domain/Mapper";
import { EventCultureResponse } from "core/domain/entities/apiResponse/EventCultureResponse";

export class EventCultureApiResponseMapper implements Mapper<EventCulture, EventCultureResponse>{
    fromDomain(eventCulture: EventCulture): EventCultureResponse {
        return {
            date:eventCulture.props.date,
            note: eventCulture.props.note
        }
    }
}