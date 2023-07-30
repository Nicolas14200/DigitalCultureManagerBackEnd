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

const app = express();

configureExpress(app);

describe("e2e - EventCultureController", () => {
    let plotRepo: MongoDbPlotRepository;
    let plot : Plot;
    beforeAll(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM_test_e2e`);
        plotRepo = new MongoDbPlotRepository()
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
    });
    it("Should return 200 and create an Event culture", async () => {
        await request(app)
        .post("/event/create")
        .send({
            note:"NOTE",
            plotId: plot.props.id
        })
        
        .expect( response => {
            console.log(CreateEventCulture.name, response.body)
        })
        .expect(201)
    })
    it("Should return 200 and return all envent culture of plot id", async () => {
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
})