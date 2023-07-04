import "reflect-metadata";
import express, { Application } from "express";
import { useContainer, useExpressServer } from "routing-controllers";
import { UserController } from "../../app/modules/users/UserController";
import { AppDependencies } from "./AppDependencies";

export function configureExpress(app: Application) {
    
    const routes = [UserController];

    const container = new AppDependencies().init();
    
    app.use(express.json());
    
    useContainer(container);
    
    useExpressServer(app, {
        controllers: routes
    })
}