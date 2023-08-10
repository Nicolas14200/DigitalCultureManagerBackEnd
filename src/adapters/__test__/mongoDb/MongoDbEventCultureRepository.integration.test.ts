import mongoose from "mongoose";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { MongoDbEventCultureRepository } from "../../repositories/mongoDb/MongoDbEventCultureRepository";
import { v4 } from "uuid";

describe("Integration - MongoDbEventCultureRepository", () => {
    let eventCultureRepo : MongoDbEventCultureRepository;
    let eventCulture : EventCulture;
    let eventCulture1 : EventCulture;
    let eventCulture2 : EventCulture;
    let eventCulture3 : EventCulture;
    beforeAll(async () => {
        eventCultureRepo = new MongoDbEventCultureRepository()
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        eventCulture = EventCulture.create({
            note:"Note",
            plotId: v4()
        })

        eventCulture1 = EventCulture.create({
            note:"Note1",
            plotId: eventCulture.props.plotId
        })

        eventCulture2 = EventCulture.create({
            note:"Note2",
            plotId: eventCulture.props.plotId
        })
   
        eventCulture3 = EventCulture.create({
            note:"Note3",
            plotId: eventCulture.props.plotId
        })
        await eventCultureRepo.save(eventCulture);
    })
    it("Should SAVE AND GETBYID a plot in mongodb repository", async () => {
        const eventCultureExist: EventCulture = await eventCultureRepo.getById(eventCulture.props.id)
        expect(eventCultureExist.props.note).toEqual("Note")
    })

    it("Should return an array of event culture", async () => {
        await eventCultureRepo.save(eventCulture1);
        await eventCultureRepo.save(eventCulture2);
        await eventCultureRepo.save(eventCulture3);
        const eventsCultures = await eventCultureRepo.getEventCultureByPlotId(eventCulture.props.plotId);
        console.log(eventsCultures)
        expect(eventsCultures[0].props.note).toEqual("Note")
    })

    it("Should delete a eventCulture", async () => {
        await eventCultureRepo.delete(eventCulture1.props.id);
        const eventCulture1Exist = eventCultureRepo.getById(eventCulture1.props.id);
        expect(eventCulture1Exist).rejects.toThrow("EVENT_CULTURE_NOT_FOUND");
    })

})