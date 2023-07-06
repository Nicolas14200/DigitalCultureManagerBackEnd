import { Plot } from "../entities/plot/Plot";

export interface PlotRepository {
    save(plot: Plot): Promise<Plot>;
    getById(id: string) : Promise <Plot>;

} 