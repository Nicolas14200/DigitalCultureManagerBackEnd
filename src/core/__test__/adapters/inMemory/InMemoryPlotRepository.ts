import { Plot } from "core/domain/entities/plot/Plot";
import { PlotRepository } from "core/domain/repositories/PlotRepository";


export class InMemoryPlotRepository implements PlotRepository {

    constructor(readonly plotMap: Map < string, Plot > ){
    }
    
    async getById(id: string): Promise<Plot> {
            const plot: Plot = this.plotMap.get(id)
            if (!plot) {
                throw new Error("PLOT_NOT_FOUND")
              }
            return this.plotMap.get(id);
    
    }
    async save(plot: Plot): Promise<Plot> {
        this.plotMap.set(plot.plotProps.id, plot);
        return plot
    }

}

