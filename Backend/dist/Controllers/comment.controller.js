"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const comment_service_1 = __importDefault(require("../Services/comment.service"));
class CommentController {
    addComment(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let comment = req.body;
                yield comment_service_1.default.addComment(comment);
                resp.json({
                    msg: "success"
                });
            }
            catch (err) {
                resp.json({
                    err: err
                });
            }
        });
    }
    deletComment(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let commentId = Number(req.params.id);
                yield comment_service_1.default.deletComment(commentId);
                resp.json({
                    msg: "success"
                });
            }
            catch (err) {
                console.log(err);
                resp.json({
                    err: err
                });
            }
        });
    }
    getCommentsByPostId(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
module.exports = new CommentController();
