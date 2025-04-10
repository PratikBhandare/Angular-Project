"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = __importDefault(require("../Controllers/subscription.controller"));
const subscriptionRouter = express_1.default.Router();
subscriptionRouter.post("/add", subscription_controller_1.default.addSubscription);
subscriptionRouter.post("/getallsubscriptions", subscription_controller_1.default.addSubscription);
module.exports = subscriptionRouter;
