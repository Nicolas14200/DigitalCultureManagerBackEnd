import { Mapper } from "core/domain/Mapper";
import { EventCulture } from "../../../../core/domain/entities/event/EventCulture";
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
    subPlot: Plot[];
    eventCulture: EventCulture[];
}

export class MongoDbPlotMapper implements Mapper<Plot, MongoDbPlotMapperProps>{
    toDomain(raw: MongoDbPlotMapperProps): Plot {
        return new Plot({
            id: raw.id,
            name: raw.name,
            codeName: raw.codeName,
            width:raw.width,
            heigth: raw.heigth,
            area: raw.area,
            ph: raw.ph,
            pebbles: raw.pebbles,
            plank:raw.plank,
            series: raw.series,
            subPlot: raw.subPlot,
            eventCulture:raw.eventCulture,
        })
    }
}