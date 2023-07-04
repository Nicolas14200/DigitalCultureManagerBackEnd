import 'reflect-metadata';
import mongoose from "mongoose";
import { v4 } from "uuid";
import request from "supertest";
import express from "express";
import { configureExpress } from "../config/configureExpress"
import { CreateUser } from "../../core/usecase/user/CreateUser";

const app = express();

configureExpress(app);

describe("e2e - UserController", () => {
    beforeAll(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM_test_e2e`);
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
})