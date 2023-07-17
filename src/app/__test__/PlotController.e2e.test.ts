import 'reflect-metadata';
import mongoose from "mongoose";
import express from "express";
import { configureExpress } from "../config/configureExpress";
import { MongoDbPlotRepository } from "../../adapters/repositories/mongoDb/MongoDbPlotRepository";
import { Plot } from "../../core/domain/entities/plot/Plot";
import { StarsLevel } from "../../core/domain/valueObjects/StarsLevel";
import request from "supertest";
import { CreatePlot } from "../../core/usecase/plot/CreatePlot";
import { v4 } from "uuid";
import { UpdatePlot } from "../../core/usecase/plot/UpdatePlot";
import { GetPlotById } from '../../core/usecase/plot/GetPlotById';
import { DeletePlot } from '../../core/usecase/plot/DeletePlot';

const app = express();

configureExpress(app);

describe("e2e - PlotController", () => {
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

    it("Should return 201", async () => {
        await request(app)
        .post("/plot/create")
        .send({
            name: `${v4()}`,
            codeName: `${v4()}`,
            width: 10,
            heigth: 10,
            ph: 1,
            pebbles: 0,
            plank: 2,
        })
        .expect(201)
        .expect( response => {
            console.log(CreatePlot.name, response.body)
        });
    });

    it("Should return 201", async () => {
        await request(app)
        .put("/plot/")
        .send({
            id: plot.props.id,
            codeName: "AZERTY666",
            name: "NEW_NAME",
            pebbles: plot.props.pebbles,
            ph: plot.props.ph,
            plank: plot.props.plank,
        })
        .expect(201)
        .expect( response => {
            console.log(UpdatePlot.name, response.body)
        });
    });
    
    it("Should return 200 and a plot via is Id", async () => {
        await request(app)
        .get(`/plot/${plot.props.id}`)
        .send({
            id: plot.props.id
        })
        .expect(200)
        .expect( response => {
            console.log(GetPlotById.name, response.body)
        });
    })

    it("Should delete a plot", async () => {
        await request(app)
        .delete("/plot/")
        .send({
            id: plot.props.id
        })
        .expect(200)
        .expect( response => {
            console.log(DeletePlot.name, response.body)
        });
    })
})