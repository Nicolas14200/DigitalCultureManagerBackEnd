import { CreatePlot, CreatePlotProps } from "../../../core/usecase/plot/CreatePlot";
import { injectable } from "inversify";
import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import { CreatePlotCommand } from "./commands/CreatePlotCommand";
import { PlotApiResponseMapper } from "./dto/PlotApiResponseMapper";
import { Request, Response } from "express";

@JsonController("/plot")
@injectable()
export class PlotController {
  private userApiResponseMapper: PlotApiResponseMapper =
  new PlotApiResponseMapper();
  constructor(
    private readonly _createPlot: CreatePlot,
  ) {}

  @Post("/create")
  async createUser(
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
      console.log(cmd)
      const user = await this._createPlot.execute(payload);
      
      return response.status(201).send({
        ...this.userApiResponseMapper.fromDomain(user),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}