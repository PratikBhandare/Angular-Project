"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sunscriptionRepo = void 0;
const Database_1 = require("../Configs/Database");
const subscription_1 = require("../Entities/subscription");
exports.sunscriptionRepo = Database_1.AppDataSOurce.getRepository(subscription_1.Subscription);
