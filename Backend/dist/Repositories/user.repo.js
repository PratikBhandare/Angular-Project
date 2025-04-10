"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const Database_1 = require("../Configs/Database");
const users_1 = require("../Entities/users");
exports.userRepo = Database_1.AppDataSOurce.getRepository(users_1.User);
