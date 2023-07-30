import { injectable } from "inversify";
import { Body, Get, JsonController, Post, Req, Res } from "routing-controllers";
import { EventCultureApiResponseMapper } from "./dto/EventCultureApiResponseMapper";
import { CreateEventCultureCommand } from "./commands/CreateEventCultureCommand";
import { CreateEventCulture } from "../../../core/usecase/eventCulture/CreateEventCulture";
import { Request, Response } from "express";
import { GetEventsCulturesByPlotIdCommand } from "./commands/GetEventsCulturesByPlotIdCommand";
import { GetEventsCulturesByPlotId } from "../../../core/usecase/eventCulture/GetEventsCulturesByPlotId";

@JsonController("/event")
@injectable()
export class EventCultureController {
  private eventCultureApiResponseMapper: EventCultureApiResponseMapper =
    new EventCultureApiResponseMapper();
  constructor(private readonly _createEventCulture: CreateEventCulture,
              private readonly _getEventsCulturesByPlotId: GetEventsCulturesByPlotId ) {}
  @Post("/create")
  async createEventCulture(
    @Req() request: Request,
    @Res() response: Response,
    @Body() cmd: CreateEventCultureCommand
  ) {
    try {
      const eventCulture = await this._createEventCulture.execute({
        note: cmd.note,
        plotId: cmd.plotId,
      });
      return response.status(201).send({
        ...this.eventCultureApiResponseMapper.fromDomain(eventCulture),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Post("/getbyplotid")
  async getEventsCulturesByPlotId(
    @Req() request: Request,
    @Res() response: Response,
    @Body() cmd: GetEventsCulturesByPlotIdCommand
  ) {
    try {
      const eventCultureArray = await this._getEventsCulturesByPlotId.execute( cmd.plotId);
      const eventCultureResponse = eventCultureArray.map((eventCulture)=> this.eventCultureApiResponseMapper.fromDomain(eventCulture))
      return response.status(200).send({
        eventCultureResponse
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}
