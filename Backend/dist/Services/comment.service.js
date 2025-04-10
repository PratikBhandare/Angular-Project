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
const comment_repo_ts_1 = require("../Repositories/comment.repo.ts");
class CommentService {
    addComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("This is Comment:",comment);
            yield comment_repo_ts_1.commentRepo.save(comment);
        });
    }
    deletComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("This is Comment:",comment);
            yield comment_repo_ts_1.commentRepo.delete(commentId);
        });
    }
}
module.exports = new CommentService();
