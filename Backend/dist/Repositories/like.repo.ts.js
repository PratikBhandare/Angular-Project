"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRepo = void 0;
const like_1 = require("../Entities/like");
const Database_1 = require("../Configs/Database");
exports.likeRepo = Database_1.AppDataSOurce.getRepository(like_1.Like);
