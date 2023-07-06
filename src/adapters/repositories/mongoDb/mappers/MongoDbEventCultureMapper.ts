import { Mapper } from "../../../../core/domain/Mapper";
import { EventCulture } from "../../../../core/domain/entities/event/EventCulture";

export interface MongoDbEventCultureMapperProps {
    id: string;
    date: Date;
    note: string;
    plotId: string;
}

export class MongoDbEventCultureMapper implements Mapper< EventCulture, MongoDbEventCultureMapperProps >{
    toDomain(raw: MongoDbEventCultureMapperProps): EventCulture {
        return new EventCulture({
            id: raw.id,
            date: raw.date,
            note: raw.note,
            plotId: raw.plotId
        })
    }
}