import { CreatePlot, CreatePlotProps } from "../../../core/usecase/plot/CreatePlot";
import { injectable } from "inversify";
import { Body, JsonController, Post, Put, Req, Res } from "routing-controllers";
import { CreatePlotCommand } from "./commands/CreatePlotCommand";
import { PlotApiResponseMapper } from "./dto/PlotApiResponseMapper";
import { Request, Response } from "express";
import { UpdatePlotCommand } from "./commands/UpdatePlotCommand";
import { UpdatePlot } from "../../../core/usecase/plot/UpdatePlot";

@JsonController("/plot")
@injectable()
export class PlotController {
  private plotApiResponseMapper: PlotApiResponseMapper =
  new PlotApiResponseMapper();
  constructor(
    private readonly _createPlot: CreatePlot,
    private readonly _updatePlot: UpdatePlot
  ) {}

  @Post("/create")
  async createPlot(
    @Req() request: Request,
    @Res() response: Response,
    @Body() cmd: CreatePlotCommand
  ) {
    try {
      const payload: CreatePlotProps = {
        name: cmd.name,
        codeName: cmd.codeName,
        width: cmd.width,
        heigth: cmd.heigth,
        ph: cmd.ph,
        pebbles: cmd.pebbles,
        plank: cmd.plank,
      };
      
      const plot = await this._createPlot.execute(payload);
      return response.status(201).send({
        ...this.plotApiResponseMapper.fromDomain(plot),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Put("/")
  async updatePlot(
    @Res() response: Response,
    @Body() cmd: UpdatePlotCommand
  ){
    try{
      const plot = await this._updatePlot.execute({
        id: cmd.id,
        codeName: cmd.codeName,
        name: cmd.name,
        pebbles: cmd.pebbles,
        ph: cmd.ph,
        plank: cmd.plank,
      })
      return response.status(201).send({
        ...this.plotApiResponseMapper.fromDomain(plot),
      });
    }
    catch(e){
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}