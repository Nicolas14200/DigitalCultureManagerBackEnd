import { injectable } from "inversify";
import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import { EventCultureApiResponseMapper } from "./dto/EventCultureApiResponseMapper";
import { CreateEventCultureCommand } from "./commands/CreateEventCultureCommand";
import { CreateEventCulture } from "../../../core/usecase/eventCulture/CreateEventCulture";
import { Request, Response } from "express";

@JsonController("/event")
@injectable()
export class EventCultureController {
  private eventCultureApiResponseMapper: EventCultureApiResponseMapper =
    new EventCultureApiResponseMapper();
    constructor(
        private readonly _createEventCulture: CreateEventCulture
    ){}
    @Post("/create")
    async createEventCulture (
        @Req() request: Request,
        @Res() response: Response,
        @Body() cmd: CreateEventCultureCommand
    ){
        try{
            const eventCulture = await this._createEventCulture.execute({
                note:"NOTE",
                plotId:"PLOT_ID"
            })
            return response.status(201).send({
                ...this.eventCultureApiResponseMapper.fromDomain(eventCulture),
              });
        }catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
    }
}
