import { Body, Delete, Get, JsonController, Post, Put, Req, Res } from "routing-controllers";
import { CreateUserCommand } from "./commands/CreateUserCommand";
import { Request, Response } from "express";
import { CreateUser, CreateUserProps } from "../../../core/usecase/user/CreateUser";
import { UserApiResponseMapper } from "./dto/UserApiResponseMappper";
import { injectable } from "inversify";
import { UpdateUserCommand } from "./commands/UpdateUserCommand";
import { UpdateUser } from "../../../core/usecase/user/UpdateUser";
import { GetUserById } from "../../../core/usecase/user/GetUserById";
import { DeleteUser } from "../../../core/usecase/user/DeleteUser";

@JsonController("/user")
@injectable()
export class UserController {
  private userApiResponseMapper: UserApiResponseMapper =
  new UserApiResponseMapper();
  constructor(
    private readonly _createUser: CreateUser,
    private readonly _updateUser: UpdateUser,
    private readonly _getUserById: GetUserById,
    private readonly _deleteUser: DeleteUser
  ) {}

  @Post("/create")
  async createUser(
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

  @Put("/")
  async updateUser(
    @Res() response: Response,
    @Body() cmd: UpdateUserCommand
  ) {
    try {
      const user = await this._updateUser.execute({
        id: cmd.id,
        name: cmd.name,
        password: cmd.password,
      })
      return response.status(200).send({
        ...this.userApiResponseMapper.fromDomain(user),
      });
    }
    catch(e){
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Get("/:id")
  async getUserById(   
    @Req() request: Request, 
    @Res() response: Response,
  ) {
    try{
      const user = await this._getUserById.execute(request.params.id)
      return response.status(200).send({
        ...this.userApiResponseMapper.fromDomain(user),
      });
    }
    catch(e){
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  @Delete("/delete")
  async deleteUser(
    @Req() request: Request, 
    @Res() response: Response,
  ){
    try{
      await this._deleteUser.execute(request.body.id);
      return response.sendStatus(204);
    }
    catch(e){
      return response.status(400).send({
        message: e.message,
      });
    }
  }
  
}

