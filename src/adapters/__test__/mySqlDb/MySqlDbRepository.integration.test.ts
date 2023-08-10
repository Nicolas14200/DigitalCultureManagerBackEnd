import {MySqlDbUserRepository} from "../../repositories/mySqlDb/MySqlDbUserRepository"
import mysql from "mysql2/promise";
import {User} from "../../../core/domain/entities/user/User";
import { Role } from "../../../core/domain/valueObjects/Role";

describe("Integration - MySqlDbRepository", () => {
  let mySqlDbUserRepository: MySqlDbUserRepository;
  let connection: mysql.Connection;

  beforeAll(async () => {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "test",
    });
    mySqlDbUserRepository = new MySqlDbUserRepository(connection)
  })
  afterAll(async () => {
    connection.end();
  });
  it("Should save into users some value in column", async () => {
     connection.execute("INSERT INTO users (name, role) VALUES ('Roger', 'Patron')");
  });
  it("Should return a value", async () => {
    const result = await connection.execute("SELECT * FROM users ");
  });
  
  it("Should savez a user", async () => {
    try{
    const user: User = User.create({
      email:"email1@email.fr",
      name:"NAME",
      password:"PASSSWORD0000000",
      role: Role.admin,
    });
    await mySqlDbUserRepository.save(user);
    }catch(e){
      console.log("ERRROR====>", e )
    }
  });

  it("Should get a user by is email", async () => {

    const user: User = User.create({
      email:"email2@email.fr",
      name:"NAME",
      password:"PASSSWORD0000000",
      role: Role.admin,
    });
    const userGetByEmail: User = await mySqlDbUserRepository.getByEmail(user.props.email);
    expect(userGetByEmail.props.email).toEqual("email2@email.fr")

  });
});
