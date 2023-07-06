import { Series } from "../../../../core/domain/valueObjects/Series";
import { StarsLevel } from "../../../../core/domain/valueObjects/StarsLevel";
import { EventCulture } from "../event/EventCulture";
import { v4 } from "uuid";

export interface PlotProps {
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

export class Plot {

    constructor( readonly plotProps : PlotProps){}
    static create (props: {
        name: string;
        codeName: string;
        width: number;
        heigth: number;
        ph: number;
        pebbles: StarsLevel;
        plank: number;
    }){
        return new Plot({
            ...props,
            id: v4(),
            area: props.width * props.heigth,
            series: [],
            subPlot: [],
            eventCulture: [],
        })
    }

    update(props: {
        name: string;
        codeName: string;
        ph: number;
        pebbles: StarsLevel;
        plank: number;
    }){
        this.plotProps.name = props.name,
        this.plotProps.codeName = props.codeName,
        this.plotProps.ph = props.ph,
        this.plotProps.pebbles = props.pebbles,
        this.plotProps.plank = props.plank
    }
}