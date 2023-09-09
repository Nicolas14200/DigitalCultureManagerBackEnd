import { CreatePlot, CreatePlotProps } from "../../../core/usecase/plot/CreatePlot";
import { inject, injectable } from "inversify";
import { Body, Delete, Get, JsonController, Post, Put, Req, Res } from "routing-controllers";
import { CreatePlotCommand } from "./commands/CreatePlotCommand";
import { PlotApiResponseMapper } from "./dto/PlotApiResponseMapper";
import { Request, Response } from "express";
import { UpdatePlotCommand } from "./commands/UpdatePlotCommand";
import { UpdatePlot } from "../../../core/usecase/plot/UpdatePlot";
import { DeletePlot } from "../../../core/usecase/plot/DeletePlot";
import { DeletePlotCommand } from "./commands/DeletePlotCommand";
import { GetPlotById } from "../../../core/usecase/plot/GetPlotById";
import { AddSeriesToPlot } from "../../../core/usecase/plot/AddSeriesToPlot";
import { AddSeriesToPlotCommand } from "./commands/AddSeriesToPlotCommand";
import { AddSubPlotCommand } from "./commands/AddSubPlotCommand";
import { AddSubPlot } from "../../../core/usecase/plot/AddSubPlot";
import { MongoDbPlotRepository } from "../../../adapters/repositories/mongoDb/MongoDbPlotRepository";
import { DCMIdentifiers } from "../../../core/usecase/DCMIdentifiers";
import { GetAllPlot } from "../../../core/usecase/plot/GetAllPlot";

@JsonController("/plot")
@injectable()
export class PlotController {
  private plotApiResponseMapper: PlotApiResponseMapper =
  new PlotApiResponseMapper();
  constructor(
    private readonly _createPlot: CreatePlot,
    private readonly _updatePlot: UpdatePlot,
    private readonly _deletePlot: DeletePlot,
    private readonly _getPlotById: GetPlotById,
    private readonly _addSeriesToPlot: AddSeriesToPlot,
    private readonly _addSubPlot: AddSubPlot,
    @inject(DCMIdentifiers.plotRepository)
    private readonly _plotRepo: MongoDbPlotRepository,
    private readonly _getAllPlot: GetAllPlot
  ) {}

  @Get("/")
  async plot(   
    @Req() request: Request, 
    @Res() response: Response,
  ) {
    try{
      
      return response.statusCode = 200;
    }
    catch(e){
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @Post("/create")
  async createPlot(
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
        heigth: cmd.heigth,
        width: cmd.width,
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
  
  @Delete("/")
  async deletePlot(
    @Res() response: Response,
    @Body() cmd: DeletePlotCommand
  ){
    this._deletePlot.execute(cmd.id);
    return response.sendStatus(200);
  }

  @Get("/:id")
  async getPlotById(
    @Res() response: Response,
    @Req() request: Request,
  ){
    const plot = await this._getPlotById.execute(request.params.id)
    return response.status(200).send({
      ...this.plotApiResponseMapper.fromDomain(plot)
    });
  }

  @Post("/addseries")
  async addSeriesToPlot(
    @Res() response: Response,
    @Body() cmd: AddSeriesToPlotCommand
  ){
    const plot = await this._addSeriesToPlot.execute({
        plotId:cmd.plotId,
        series:{
          nbPlank: cmd.series.nbPlank,
          vegetableVariety: cmd.series.vegetableVariety,
        },
    })
    return response.sendStatus(200);
  }

  @Post("/addsubplot")
  async addSubPlot(
    @Res() response: Response,
    @Body() cmd: AddSubPlotCommand
  ){
    try{
      await this._addSubPlot.execute({
        currentId : cmd.currentId,
        plotIdToAdd: cmd.plotIdToAdd
    })

    return response.status(200).send( await this._plotRepo.getById(cmd.currentId));
    }catch(e){
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Post("/all")
  async getAllPlot(
    @Res() response: Response,
    @Req() request: Request,
  ){
    try{
      const allPlot = await this._getAllPlot.execute();

      return response.status(200).send(allPlot.map((plot)=> {
        return this.plotApiResponseMapper.fromDomain(plot)
      }));
    }catch(e){
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}