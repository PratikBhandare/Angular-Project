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
const like_repo_ts_1 = require("../Repositories/like.repo.ts");
const post_repo_1 = require("../Repositories/post.repo");
class LikeService {
    likePost(like) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield post_repo_1.postRepo.find({
                relations: {
                    likes: { user: true },
                },
                where: { id: like.post.id }
            });
            for (let i = 0; i < post[0].likes.length; i++) {
                console.log(post[0].likes[i].user.id);
                if (post[0].likes[i].user.id == like.user.id) {
                    console.log("liked userid:", post[0].likes[i].user.id);
                    console.log("try to like userid:", like.user.id);
                    console.log("aleredy Liked.");
                    return "Alredy Liked...";
                }
            }
            yield like_repo_ts_1.likeRepo.save(like);
            try {
                yield post_repo_1.postRepo.update({ id: like.post.id }, { likesCount: post[0].likes.length + 1 });
            }
            catch (err) {
                return "Not Logged In...";
            }
            return "success";
        });
    }
}
module.exports = new LikeService();
