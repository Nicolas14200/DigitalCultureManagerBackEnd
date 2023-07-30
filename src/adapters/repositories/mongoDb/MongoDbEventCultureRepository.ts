import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { MongoDbEventCultureMapper, MongoDbEventCultureMapperProps } from "./mappers/MongoDbEventCultureMapper";
import { eventCultureModel } from "./models/EventCultureModel";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";

export class MongoDbEventCultureRepository implements EventCultureRepository {

    private mongoDbEventCultureMapper: MongoDbEventCultureMapper = new MongoDbEventCultureMapper()
    
    async getEventCultureByPlotId(plotId: string): Promise<EventCulture[]> {
        const results: MongoDbEventCultureMapperProps[] = await eventCultureModel.find({
            plotId: plotId
        });
        const eventCultureArray: EventCulture[] = results.map((result) =>
            this.mongoDbEventCultureMapper.toDomain(result)
        );
        return eventCultureArray;
    }

    async save(eventCulture: EventCulture): Promise<EventCulture> {
        await eventCultureModel.findOneAndUpdate(
            {
                id: eventCulture.props.id
            },
            {
                $set: {
                    id: eventCulture.props.id,
                    date: eventCulture.props.date,
                    note: eventCulture.props.note,
                    plotId: eventCulture.props.plotId
                }
            },
            {
                upsert: true,
            }
        )
        return eventCulture;
    }
    
    async getById(id: string): Promise<EventCulture> {
        const result: MongoDbEventCultureMapperProps = await eventCultureModel.findOne({
            id: id
        });
        if (result){
            return this.mongoDbEventCultureMapper.toDomain(result);
        }
    }
}