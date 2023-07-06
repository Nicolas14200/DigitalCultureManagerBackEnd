import { Mapper } from "../../../../core/domain/Mapper";
import { PlotResponse } from "../../../../core/domain/entities/apiResponse/PlotResponse";
import { Plot } from "../../../../core/domain/entities/plot/Plot";

export class PlotApiResponseMapper implements Mapper<Plot, PlotResponse>{
    fromDomain(plot: Plot): PlotResponse {
        return {
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
            eventCulture: plot.plotProps.eventCulture
        }
    }
}