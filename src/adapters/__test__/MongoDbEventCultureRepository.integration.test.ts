import mongoose from "mongoose";
import { EventCulture } from "../../core/domain/entities/eventCulture/EventCulture";
import { MongoDbEventCultureRepository } from "../repositories/mongoDb/MongoDbEventCultureRepository";
import { v4 } from "uuid";

describe("Integration - MongoDbEventCultureRepository", () => {
    let eventCultureRepo : MongoDbEventCultureRepository;
    let eventCulture : EventCulture;
    beforeAll(async () => {
        eventCultureRepo = new MongoDbEventCultureRepository()
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        eventCulture = EventCulture.create({
            note:"Note",
            plotId:v4()
        })
    })
    it("Should save a plot in mongodb repository", async () => {
        await eventCultureRepo.save(eventCulture);
        const eventCultureExist: EventCulture = await eventCultureRepo.getById(eventCulture.eventProps.id)
        console.log(eventCultureExist);
        expect(eventCultureExist.eventProps.note).toEqual("Note")
    })
})