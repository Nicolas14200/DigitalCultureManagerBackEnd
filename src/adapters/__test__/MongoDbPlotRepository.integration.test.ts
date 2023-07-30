import mongoose from "mongoose";
import { Plot } from "../../core/domain/entities/plot/Plot";
import { MongoDbPlotRepository } from "../repositories/mongoDb/MongoDbPlotRepository";
import { StarsLevel } from "../../core/domain/valueObjects/StarsLevel";
describe("Integration - MongoDbPlotRepository", () => {
    let PlotRepo : MongoDbPlotRepository;
    let plot : Plot;
    beforeAll(async () => {
        PlotRepo = new MongoDbPlotRepository()
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        plot = Plot.create({
            name: "parcelle 01",
            codeName: "ASX45",
            width:10,
            heigth:10,
            ph: 1,
            pebbles: StarsLevel.one,
            plank: 2,
        })
    })
    it("Should save a plot in mongodb repository", async () => {
        await PlotRepo.save(plot);
        const plotExist: Plot = await PlotRepo.getById(plot.props.id)
        expect(plotExist.props.name).toEqual("parcelle 01")
    })
})