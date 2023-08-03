import { Mapper } from "core/domain/Mapper";
import { EventCulture } from "../../../../core/domain/entities/eventCulture/EventCulture";
import { Plot } from "../../../../core/domain/entities/plot/Plot";
import { Series } from "../../../../core/domain/valueObjects/Series";
import { StarsLevel } from "../../../../core/domain/valueObjects/StarsLevel";

export interface MongoDbPlotMapperProps {
  id: string;
  name: string;
  codeName: string;
  width: number;
  heigth: number;
  area: number;
  ph: number;
  pebbles: StarsLevel;
  plank: number;
  series: Series[];
  subPlot: string[];
  eventCulture: EventCultureMapperProps[];
}

export interface EventCultureMapperProps {
  id: string;
  date: Date;
  note: string;
  plotId: string;
}

export class MongoDbPlotMapper implements Mapper<Plot, MongoDbPlotMapperProps> {

  toDomain(raw: MongoDbPlotMapperProps): Plot {
    return new Plot({
      id: raw.id,
      name: raw.name,
      codeName: raw.codeName,
      width: raw.width,
      heigth: raw.heigth,
      area: raw.area,
      ph: raw.ph,
      pebbles: raw.pebbles,
      plank: raw.plank,
      subPlot: raw.subPlot,
      series: raw.series.map((series) => {
        return{
          nbPlank: series.nbPlank,
          vegetableVariety: series.vegetableVariety,
        }
      }),
      eventCulture: raw.eventCulture.map((eventCulture) => {
        return new EventCulture({
            date: eventCulture.date,
            id: eventCulture.id,
            note: eventCulture.note,
            plotId: eventCulture.plotId,
          })
      }),
    });
  }

  fromDomain(plot: Plot): MongoDbPlotMapperProps {
    return {
      area: plot.props.area,
      codeName: plot.props.codeName,
      heigth: plot.props.heigth,
      id: plot.props.id,
      name: plot.props.name,
      pebbles: plot.props.pebbles,
      ph: plot.props.ph,
      plank: plot.props.plank,
      subPlot: plot.props.subPlot,
      width: plot.props.width,
      series: plot.props.series.map((series)=> {
        return {
          nbPlank: series.nbPlank,
          vegetableVariety: series.vegetableVariety,
        }
      }),
      eventCulture: plot.props.eventCulture.map((eventCulture) => {
        return {
          date: eventCulture.props.date,
          id: eventCulture.props.id,
          note: eventCulture.props.note,
          plotId: eventCulture.props.plotId,
        };
      }),
    };
  }
}
