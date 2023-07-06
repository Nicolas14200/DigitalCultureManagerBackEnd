import { StarsLevel } from "../../../core/domain/valueObjects/StarsLevel";
import { Usecase } from "../Usecase";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { injectable } from "inversify";

export interface CreatePlotProps {
    name: string;
    codeName: string;
    width: number;
    heigth: number;
    ph: number;
    pebbles: StarsLevel;
    plank: number;
}
@injectable()
export class CreatePlot implements Usecase<CreatePlotProps, Plot> {

    constructor(private readonly _plotRepository : PlotRepository){}

    execute(payload: CreatePlotProps): Plot {
        const plot =  Plot.create({
            name: payload.name,
            codeName: payload.codeName,
            width: payload.width,
            heigth: payload.heigth,
            ph: payload.ph,
            pebbles: payload.pebbles,
            plank: payload.plank,
        })
        this._plotRepository.save(plot)
        return plot;
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN") {
            return true;
        }
        return false;
    }

}