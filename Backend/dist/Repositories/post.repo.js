"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepo = void 0;
const Database_1 = require("../Configs/Database");
const post_1 = require("../Entities/post");
exports.postRepo = Database_1.AppDataSOurce.getRepository(post_1.Post);
