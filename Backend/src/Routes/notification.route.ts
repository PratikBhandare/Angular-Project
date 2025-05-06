import express from "express";
import notificationController from "../Controllers/notification.controller";




const notificationRouter= express.Router();

notificationRouter.post("/addnotification",notificationController.addNotification);
notificationRouter.get("/getnotification",notificationController.getNotification);


export =notificationRouter;