import mongoose, { Connection } from "mongoose";
import { Plot } from "../../core/domain/entities/plot/Plot";
import { MongoDbPlotRepository } from "../repositories/mongoDb/MongoDbPlotRepository";
import { StarsLevel } from "../../core/domain/valueObjects/StarsLevel";
import { EventCulture } from "../../core/domain/entities/eventCulture/EventCulture";
import { AddSeriesToPlot } from "../../core/usecase/plot/AddSeriesToPlot";

describe("Integration - MongoDbPlotRepository", () => {
    let PlotRepo : MongoDbPlotRepository;
    let plot : Plot;
    let eventCulture1: EventCulture
    let eventCulture2: EventCulture
    let eventCulture3: EventCulture
    let connection: Connection;
    let addSeriesToPlot: AddSeriesToPlot;
    beforeAll(async () => {
        PlotRepo = new MongoDbPlotRepository();
        addSeriesToPlot = new AddSeriesToPlot(PlotRepo);
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        connection = mongoose.createConnection(
            `mongodb://127.0.0.1:27017/DCM`
          );
        plot = Plot.create({
            name: "parcelle 01",
            codeName: "ASX45",
            width:10,
            heigth:10,
            ph: 1,
            pebbles: StarsLevel.one,
            plank: 2,
        })
        eventCulture1 = EventCulture.create({
            note:"NOTE1",
            plotId:plot.props.id,
        })
        eventCulture2 = EventCulture.create({
            note:"NOTE2",
            plotId:plot.props.id,
        })
        eventCulture3 = EventCulture.create({
            note:"NOTE3",
            plotId:plot.props.id,
        })
        plot.addEventCulture(eventCulture1);
        plot.addEventCulture(eventCulture2);
        plot.addEventCulture(eventCulture3);
        await PlotRepo.save(plot);
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close(true);
      });

    it("Should save a plot in mongodb repository", async () => {
        const plotExist: Plot = await PlotRepo.getById(plot.props.id);
        expect(plotExist.props.name).toEqual("parcelle 01");
        expect(plotExist.props.eventCulture[0].props.note).toEqual("NOTE1");
    })

    it("Should add a series to a plot", async () => {
        await addSeriesToPlot.execute({
            id: plot.props.id,
            series:{
                nbPlank: 10,
                vegetableVariety: "NAVET",
            }
        });
        const plotExist: Plot = await PlotRepo.getById(plot.props.id);
        console.log(JSON.stringify(plotExist))
        expect(plotExist.props.series[0].vegetableVariety).toEqual("NAVET");
    })
})