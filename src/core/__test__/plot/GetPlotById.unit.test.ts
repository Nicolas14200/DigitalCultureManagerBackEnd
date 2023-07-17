import 'reflect-metadata';
import { Plot } from "../../domain/entities/plot/Plot";
import { PlotRepository } from "../../domain/repositories/PlotRepository";
import { GetPlotById } from "../../usecase/plot/GetPlotById";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";

describe('Unit - GetPlotById', () => {
    let plotRepo : PlotRepository;
    let getPlotById: GetPlotById;
    let plot: Plot;
    beforeAll( async () => {
        plotRepo = new InMemoryPlotRepository(new Map());
        getPlotById = new GetPlotById(plotRepo);
        plot = Plot.create({
            name: "Parcelle 0001",
            codeName: "code alpha romero bétasoid",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })
        await plotRepo.save(plot);
    })
    it("Should return a plot via is ID", async () => {
        const plotById: Plot = await getPlotById.execute(plot.plotProps.id);
        expect(plotById.plotProps.name).toEqual("Parcelle 0001")
    })
})