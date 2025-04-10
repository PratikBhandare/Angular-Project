"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepo = void 0;
const Database_1 = require("../Configs/Database");
const comment_1 = require("../Entities/comment");
exports.commentRepo = Database_1.AppDataSOurce.getRepository(comment_1.Comment);
