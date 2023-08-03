import 'reflect-metadata';
import express from "express";
import request from "supertest";
import { configureExpress } from "../config/configureExpress";
import mongoose from "mongoose";
import { MongoDbPlotRepository } from "../../adapters/repositories/mongoDb/MongoDbPlotRepository";
import { Plot } from "../../core/domain/entities/plot/Plot";
import { v4 } from "uuid";
import { StarsLevel } from "../../core/domain/valueObjects/StarsLevel";
import { CreateEventCulture } from "../../core/usecase/eventCulture/CreateEventCulture";
import { GetEventsCulturesByPlotId } from '../../core/usecase/eventCulture/GetEventsCulturesByPlotId';
import { GetEventCultureById } from '../../core/usecase/eventCulture/GetEventCultureById';
import { MongoDbEventCultureRepository } from '../../adapters/repositories/mongoDb/MongoDbEventCultureRepository';
import { EventCulture } from '../../core/domain/entities/eventCulture/EventCulture';
import { DCMIdentifiers } from '../../core/usecase/DCMIdentifiers';
import { UpdateEventCulture } from '../../core/usecase/eventCulture/UpdateEventCulture';

const app = express();

const container = configureExpress(app);

describe("e2e - EventCultureController", () => {
    let plotRepo: MongoDbPlotRepository;
    let eventCultureRepo: MongoDbEventCultureRepository;
    let eventCulture: EventCulture
    let plot : Plot;
    beforeAll(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        plotRepo = container.get(DCMIdentifiers.plotRepository)
        eventCultureRepo = container.get(DCMIdentifiers.eventCultureRepository)

        plot = Plot.create({
            name:`${v4()}`,
            codeName:`${v4()}`,
            heigth:1,
            width:1,
            pebbles:StarsLevel.one,
            ph:1,
            plank:1
        }) 
        await plotRepo.save(plot)
        eventCulture = EventCulture.create({
            note: "NOTE",
            plotId: plot.props.id,
        });
        await eventCultureRepo.save(eventCulture);
    });
    it("Should return 200 and create an Event culture", async () => {
        await request(app)
        .post("/event/create")
        .send({
            note:"NOTE",
            plotId: plot.props.id
        })
        
        .expect( response => {
            console.log(CreateEventCulture.name, response.error)
        })
        .expect(201)
    })
    it("Should return 200 and return all event culture of plot id", async () => {
        await request(app)
        .post("/event/getbyplotid")
        .send({
            plotId: plot.props.id
        })
        
        .expect( response => {
            console.log(GetEventsCulturesByPlotId.name, response.body)
        })
        .expect(200)
    })
    it("Should return 200 and return a event culture by is id", async () => {
        await request(app)
        .post("/event/getbyid")
        .send({
            id: eventCulture.props.id
        })
        .expect( response => {
            console.log(GetEventCultureById.name, response.body)
        })
        .expect(200)
    })
    it("Should return 200 and update a event culture", async () => {
        await request(app)
        .put("/event/update")
        .send({
            id: eventCulture.props.id,
            note: "NEW NOTE"
        })
        .expect( response => {
            console.log(UpdateEventCulture.name, response.body)
        })
        .expect(200)
    })
    it("Should return 200 and delete a event culture by is id", async () => {
        await request(app)
        .delete("/event/delete")
        .send({
            id: eventCulture.props.id
        })
        .expect( response => {
            console.log(GetEventCultureById.name, response.body)
        })
        .expect(200)
    })

})