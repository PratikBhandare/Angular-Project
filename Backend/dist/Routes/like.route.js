"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const like_controller_1 = __importDefault(require("../Controllers/like.controller"));
const likeRouter = express_1.default.Router();
likeRouter.post("/post", like_controller_1.default.likePost);
module.exports = likeRouter;
