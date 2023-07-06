import { v4 } from "uuid";

export interface EventCultureProps {
    id: string;
    date: Date;
    note: string;
    plotId: string;
}

export class EventCulture {
    constructor( readonly eventProps: EventCultureProps){}

    static create(props: {
        note: string;
        plotId: string;
    }){
        return new EventCulture({
            ...props,
            id: v4(),
            date: new Date()
        })
    }
}