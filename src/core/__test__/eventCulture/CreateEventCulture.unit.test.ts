import 'reflect-metadata';
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { CreateEventCulture } from "../../usecase/eventCulture/CreateEventCulture";

describe("Unit - CreateEventCulture", () => {
    let eventCultureRepo = new InMemoryEventCultureRepository(new Map());
    let createEventCulture = new CreateEventCulture(eventCultureRepo);
    it("Should create an Event Culture", async () =>{
        const eventCulture = await createEventCulture.execute({
            note: "First Note",
            plotId: "PLOT_ID",
        })
        const eventCultureExist = await eventCultureRepo.getById(eventCulture.props.id);
        expect(eventCulture.props.note).toEqual("First Note")
    })
})