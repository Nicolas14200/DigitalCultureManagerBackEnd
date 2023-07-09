import { Plot } from "../../../core/domain/entities/plot/Plot";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { MongoDbPlotMapper, MongoDbPlotMapperProps } from "./mappers/MongoDbPlotMapper";


import { PlotModel } from "./models/PlotModel";

export class MongoDbPlotRepository implements PlotRepository {

    private mongoDbPlotMapper: MongoDbPlotMapper = new MongoDbPlotMapper()
    
    async save(plot: Plot): Promise<Plot> {
        await PlotModel.findOneAndUpdate(
            {
                id: plot.plotProps.id
            },
            {
                $set: {
                    id: plot.plotProps.id,
                    name: plot.plotProps.name,
                    codeName: plot.plotProps.codeName,
                    width: plot.plotProps.width,
                    heigth: plot.plotProps.heigth,
                    area: plot.plotProps.area,
                    ph: plot.plotProps.ph,
                    pebbles: plot.plotProps.pebbles,
                    plank: plot.plotProps.plank,
                    series: plot.plotProps.series,
                    subPlot: plot.plotProps.subPlot,
                    eventCulture: plot.plotProps.eventCulture,
                }
            },
            {
                upsert: true,
            }
        )
        return plot;
    }
    
    async getById(id: string): Promise<Plot> {
        const plot: MongoDbPlotMapperProps = await PlotModel.findOne({
            id: id
        });
        if (plot){
            return this.mongoDbPlotMapper.toDomain(plot);
        }
    }

    async getByCodeName(codeName: string): Promise<Plot> {
        const plot: MongoDbPlotMapperProps = await PlotModel.findOne({
            codeName: codeName
        });
        if (plot){
            return this.mongoDbPlotMapper.toDomain(plot);
        }
    }
}