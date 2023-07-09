import { Plot } from "../../../../core/domain/entities/plot/Plot";
import { PlotError } from "../../../../core/domain/models/errors/PlotError";
import { PlotRepository } from "../../../../core/domain/repositories/PlotRepository";

export class InMemoryPlotRepository implements PlotRepository {

    constructor(readonly plotMap: Map < string, Plot > ){
    }
    
    async getById(id: string): Promise<Plot> {
            const plot: Plot = this.plotMap.get(id)
            if (!plot) {
                throw new PlotError.GetByIdFailed("PLOT_NOT_FOUND")
              }
            return this.plotMap.get(id);
    
    }

    async save(plot: Plot): Promise<Plot> {
        try{
        const plotdebug = await this.getByCodeName(plot.plotProps.codeName);
        console.log(plotdebug)
        throw new PlotError.PlotExist("PLOT_EXIST");
        }
        catch(e){
            if(e.message === "PLOT_NOT_FOUND"){
                console.log(e)
                this.plotMap.set(plot.plotProps.id, plot);
                return plot;
            }
            throw e;
        }
    }

    async update(plot: Plot): Promise<Plot> { 
        const plotExist = this.plotMap.set(plot.plotProps.id, plot);
        if(!plotExist){
            throw new PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND")
        }
        return this.plotMap.get(plot.plotProps.id);
    }

    async getByCodeName(codeName: string): Promise<Plot> {
        for (let [id, plot] of this.plotMap){
            if (plot.plotProps.codeName === codeName){
                return this.plotMap.get(id);
            }
        }
        throw new PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND")
    }

}

