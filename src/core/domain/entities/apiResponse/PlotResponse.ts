import { Series } from "../../../../core/domain/valueObjects/Series";
import { StarsLevel } from "../../../../core/domain/valueObjects/StarsLevel";
import { Plot } from "../plot/Plot";
import { EventCulture } from "../eventCulture/EventCulture";

export interface PlotResponse {
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