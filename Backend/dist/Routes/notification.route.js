"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const notification_controller_1 = __importDefault(require("../Controllers/notification.controller"));
const notificationRouter = express_1.default.Router();
notificationRouter.post("/addnotification", notification_controller_1.default.addNotification);
notificationRouter.get("/getnotification", notification_controller_1.default.getNotification);
module.exports = notificationRouter;
