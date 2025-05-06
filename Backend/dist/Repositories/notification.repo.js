"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRepo = void 0;
const Database_1 = require("../Configs/Database");
const notification_1 = require("../Entities/notification");
exports.notificationRepo = Database_1.AppDataSOurce.getRepository(notification_1.Notification);
