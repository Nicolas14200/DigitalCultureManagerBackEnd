import { Series } from "../../../../core/domain/valueObjects/Series";
import { StarsLevel } from "../../../../core/domain/valueObjects/StarsLevel";
import { EventCultureResponse } from "./EventCultureResponse";

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
    subPlot: string[];
    eventCulture: EventCultureResponse[];
}