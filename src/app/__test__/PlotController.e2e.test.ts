import mongoose from "mongoose";
import { MongoDbPlotRepository } from "../../adapters/repositories/mongoDb/MongoDbPlotRepository";
import { Plot } from "../../core/domain/entities/plot/Plot";
import { StarsLevel } from "../../core/domain/valueObjects/StarsLevel";

describe("e2e - PlotController", () => {
    let plotRepo: MongoDbPlotRepository;
    let plot : Plot;
    beforeAll(async () => {
        plotRepo = new MongoDbPlotRepository()
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM_test_e2e`);
        plot = Plot.create({
            name:"PlotName",
            codeName:"",
            heigth:1,
            width:1,
            pebbles:StarsLevel.one,
            ph:1,
            plank:1
        }) 
    })
    it("Should create a plot and save in mongoDb", async () => {
        await plotRepo.save(plot);
        const plotExist = await plotRepo.getById(plot.plotProps.id);
        expect(plotExist.plotProps.name).toEqual("PlotName");
    })
})