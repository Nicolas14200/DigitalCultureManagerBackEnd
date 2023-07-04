import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import { CreateUserCommand } from "./commands/CreateUserCommand";
import { Request, Response } from "express";
import { CreateUser, CreateUserProps } from "../../../core/usecase/user/CreateUser";
import { UserApiResponseMapper } from "./dto/UserApiResponseMappper";
import { injectable } from "inversify";

@JsonController("/user")
@injectable()
export class UserController {
  private userApiResponseMapper: UserApiResponseMapper =
  new UserApiResponseMapper();
  constructor(
    private readonly _createUser: CreateUser,
  ) {}
  @Post("/create")
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() cmd: CreateUserCommand
  ) {
    try {
      const payload: CreateUserProps = {
        email: cmd.email,
        name: cmd.name,
        password: cmd.password,
        role: cmd.role,
      };
      console.log(cmd)
      const user = await this._createUser.execute(payload);
      
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

