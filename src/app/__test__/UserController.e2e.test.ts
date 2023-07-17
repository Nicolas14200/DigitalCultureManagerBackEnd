import 'reflect-metadata';
import mongoose from "mongoose";
import { v4 } from "uuid";
import request from "supertest";
import express from "express";
import { configureExpress } from "../config/configureExpress"
import { CreateUser } from "../../core/usecase/user/CreateUser";
import { User } from '../../core/domain/entities/user/User';
import { MongoDbUserRepository } from '../../adapters/repositories/mongoDb/MongoDbUserRepository';
import { Role } from '../../core/domain/valueObjects/Role';
import { UpdateUser } from '../../core/usecase/user/UpdateUser';
import { GetUserById } from '../../core/usecase/user/GetUserById';
import { DeleteUser } from '../../core/usecase/user/DeleteUser';

const app = express();

configureExpress(app);

describe("e2e - UserController", () => {
    let user : User
    let userRepo: MongoDbUserRepository
    beforeAll(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM_test_e2e`);
        userRepo = new MongoDbUserRepository()
        user = User.create({
            email:`${v4()}ben@yopmail.com`,
            name:"BEN",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        await userRepo.save(user);
    });
    it("Should save a user in mnogoDb", async () => {
        await request(app)
        .post("/user/create")
        .send({
            email:`${v4()}@doe.com`,
            password: "Passw0rd1425783",
            role: 4,
            name: "DALAM",
        })
        .expect(201)
        .expect( response => {
            console.log(CreateUser.name, response.body)
        })
    })
    it("Should update a user", async () => {
        await request(app)
        .put("/user/")
        .send({
            id: user.props.id,
            password: "Passworchanged123456789",
            name: "ELO",
        })
        .expect(200)
        .expect( response => {
            console.log(UpdateUser.name, response.body)
        })
    })
    it("Should return a user via is ID", async () => {
        await request(app)
        .get(`/user/${user.props.id}`)
        .expect(200)
        .expect(response => {
            console.log(GetUserById.name, response.body)
        })
    })
    it("Should delete a user via is id", async () => {
        await request(app)
        .delete(`/user/delete`)
        .send({
            id: user.props.id,
        })
        .expect(204)
        .expect(response => {
            console.log(DeleteUser.name, response.body)
        })
    })
})