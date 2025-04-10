"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const comment_controller_1 = __importDefault(require("../Controllers/comment.controller"));
const commentRouter = express_1.default.Router();
commentRouter.post("/add", comment_controller_1.default.addComment);
commentRouter.delete("/delete/:id", comment_controller_1.default.deletComment);
commentRouter.post("/add", comment_controller_1.default.addComment);
module.exports = commentRouter;
