import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { MongoDbEventCultureMapper, MongoDbEventCultureMapperProps } from "./mappers/MongoDbEventCultureMapper";
import { EventCultureModel } from "./models/EventCultureModel";
import { EventCulture } from "../../../core/domain/entities/event/EventCulture";

export class MongoDbEventCultureRepository implements EventCultureRepository {

    private mongoDbEventCultureMapper: MongoDbEventCultureMapper = new MongoDbEventCultureMapper()
    
    async save(eventCulture: EventCulture): Promise<EventCulture> {
        await EventCultureModel.findOneAndUpdate(
            {
                id: eventCulture.eventProps.id
            },
            {
                $set: {
                    id: eventCulture.eventProps.id,
                    date: eventCulture.eventProps.date,
                    note: eventCulture.eventProps.note,
                    plotId: eventCulture.eventProps.plotId
                }
            },
            {
                upsert: true,
            }
        )
        return eventCulture;
    }
    
    async getById(id: string): Promise<EventCulture> {
        const result: MongoDbEventCultureMapperProps = await EventCultureModel.findOne({
            id: id
        });
        if (result){
            return this.mongoDbEventCultureMapper.toDomain(result);
        }
    }
}