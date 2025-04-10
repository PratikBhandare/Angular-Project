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
const post_repo_1 = require("../Repositories/post.repo");
const user_repo_1 = require("../Repositories/user.repo");
const apperror_1 = require("../Utils/apperror");
class PostService {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("this is post", post);
            yield post_repo_1.postRepo.save(post);
        });
    }
    updatePost(post, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("this is post", post);
            yield post_repo_1.postRepo.update({ id: postId }, post);
        });
    }
    deletPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_repo_1.postRepo.delete({ id: postId });
        });
    }
    activatePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_repo_1.postRepo.update({ id: postId }, { isActive: true });
        });
    }
    deactivatePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_repo_1.postRepo.update({ id: postId }, { isActive: false });
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    comments: true,
                    likes: true
                },
            });
            console.log(result);
            return result;
        });
    }
    getPostsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(category);
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    comments: true,
                    likes: true
                },
                where: {
                    category: category, isActive: true
                }
            });
            console.log(result);
            return result;
        });
    }
    getActivePosts() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    comments: true,
                    likes: true
                },
                where: { isActive: true }
            });
            console.log(result);
            return result;
        });
    }
    getDeActivePosts() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    comments: true,
                    likes: true
                },
                where: { isActive: false }
            });
            console.log(result);
            return result;
        });
    }
    getActivePostById(pid, uId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_repo_1.userRepo.findOne({ where: {
                    id: uId
                } });
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    comments: { author: true },
                    likes: true
                },
                where: { id: pid }
            });
            if (result[0].isActive === false) {
                if (user) {
                    if (user.role != "Admin") {
                        console.log("Error");
                        throw new apperror_1.AppError("Forbiden...!", 403);
                    }
                }
            }
            // console.log("User in getactivepost",user);
            // if(user){
            //     if(result[0].isActive===false){
            //         if(user.role!=="Admin" ){
            //             console.log("Error");
            //             throw new AppError("Forbiden...!",403)
            //         }
            // }
            // }
            console.log(result);
            return result;
        });
    }
    getDeactivePostById(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    comments: { author: true },
                    likes: true
                },
                where: { id: pid, isActive: false }
            });
            // console.log(result);
            return result;
        });
    }
    updateViews(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    comments: { author: true },
                    likes: true
                },
                where: { id: pid }
            });
            yield post_repo_1.postRepo.update({ id: pid }, { views: result[0].views + 1 });
        });
    }
    getPostsLikes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield post_repo_1.postRepo.find({
                relations: {
                    author: true,
                    likes: { user: true }
                },
                where: { id: id }
            });
            console.log(result);
            return result;
        });
    }
}
module.exports = new PostService();
