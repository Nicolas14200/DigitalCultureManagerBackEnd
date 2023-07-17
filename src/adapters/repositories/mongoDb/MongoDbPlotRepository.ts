import { Plot } from "../../../core/domain/entities/plot/Plot";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { MongoDbPlotMapper, MongoDbPlotMapperProps } from "./mappers/MongoDbPlotMapper";


import { PlotModel } from "./models/PlotModel";

export class MongoDbPlotRepository implements PlotRepository {

    private mongoDbPlotMapper: MongoDbPlotMapper = new MongoDbPlotMapper()
    
    async save(plot: Plot): Promise<Plot> {
        await PlotModel.findOneAndUpdate(
            {
                id: plot.props.id
            },
            {
                $set: {
                    id: plot.props.id,
                    name: plot.props.name,
                    codeName: plot.props.codeName,
                    width: plot.props.width,
                    heigth: plot.props.heigth,
                    area: plot.props.area,
                    ph: plot.props.ph,
                    pebbles: plot.props.pebbles,
                    plank: plot.props.plank,
                    series: plot.props.series,
                    subPlot: plot.props.subPlot,
                    eventCulture: plot.props.eventCulture,
                }
            },
            {
                upsert: true,
            }
        )
        return plot;
    }

    async update(plot: Plot): Promise<Plot> {
        await PlotModel.findOneAndUpdate(
            {
                id: plot.props.id
            },
            {
                $set: {
                    id: plot.props.id,
                    name: plot.props.name,
                    codeName: plot.props.codeName,
                    width: plot.props.width,
                    heigth: plot.props.heigth,
                    area: plot.props.area,
                    ph: plot.props.ph,
                    pebbles: plot.props.pebbles,
                    plank: plot.props.plank,
                    series: plot.props.series,
                    subPlot: plot.props.subPlot,
                    eventCulture: plot.props.eventCulture,
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

    async delete(id: string): Promise<void> {
        await PlotModel.findOneAndDelete({id});  
    }
}