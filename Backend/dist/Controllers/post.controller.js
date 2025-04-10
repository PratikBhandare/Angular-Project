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
const post_service_1 = __importDefault(require("../Services/post.service"));
class PostController {
    constructor() {
        this.file = { filename: "" }; // Ensure the object is defined
        this.file.filename = 'example.txt';
        console.log("Name:", this.file.filename);
    }
    creatPost(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Body:", (req.body));
                // console.log("File:",req.file);
                // console.log("File in creat fun:",this.file);
                let post = req.body;
                console.log("Blog object:", post);
                yield post_service_1.default.createPost(post);
                resp.json({
                    msg: "success",
                });
            }
            catch (err) {
                console.log(err);
                resp.json({
                    err: "Faild"
                });
            }
        });
    }
    getImage(req, resp) {
        resp.json({
            msg: "success get image",
        });
    }
    updatePost(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postId = Number(req.params.id);
                console.log(postId);
                let post = req.body;
                delete post.authorId;
                console.log("Inside controller", post);
                yield post_service_1.default.updatePost(post, postId);
                resp.json({
                    msg: "sucees"
                });
            }
            catch (err) {
                console.log(err);
                resp.json({
                    err: "Err"
                });
            }
        });
    }
    deletPost(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postId = Number(req.params.id);
                yield post_service_1.default.deletPost(postId);
                resp.json({
                    msg: "success"
                });
            }
            catch (err) {
                console.log(err);
                resp.json({
                    err: "err"
                });
            }
        });
    }
    activatePost(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postId = Number(req.params.id);
                yield post_service_1.default.activatePost(postId);
                resp.json({
                    msg: "success"
                });
            }
            catch (err) {
                console.log(err);
                resp.json({
                    err: "err"
                });
            }
        });
    }
    deactivatePost(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postId = Number(req.params.id);
                yield post_service_1.default.deactivatePost(postId);
                resp.json({
                    msg: "success"
                });
            }
            catch (err) {
                console.log(err);
                resp.json({
                    err: "err"
                });
            }
        });
    }
    getPosts(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            // let id=Number(req.params.id);
            let posts = yield post_service_1.default.getPosts();
            // console.log(userdata);
            resp.json({ posts: posts });
        });
    }
    getPostsByCategory(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            // let id=Number(req.params.id);
            let posts = yield post_service_1.default.getPostsByCategory(req.params.category);
            // console.log(userdata);
            resp.json({ posts: posts });
        });
    }
    getActivePosts(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            // let id=Number(req.params.id);
            let posts = yield post_service_1.default.getActivePosts();
            // console.log(userdata);
            resp.json({ posts: posts });
        });
    }
    getDeActivePosts(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            // let id=Number(req.params.id);
            let posts = yield post_service_1.default.getDeActivePosts();
            // console.log(userdata);
            resp.json({ posts: posts });
        });
    }
    getPostsLikes(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = Number(req.params.id);
            let result = yield post_service_1.default.getPostsLikes(id);
            // console.log(userdata);
            resp.json({ Likes: result });
        });
    }
    getActivePostById(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId;
            if (req.headers.user) {
                console.log("log:", JSON.parse(req.headers.user));
                let user = JSON.parse(req.headers.user);
                console.log("user is logged in ");
                userId = user.id;
            }
            try {
                console.log("helooo");
                let postId = Number(req.params.id);
                console.log("queryin", postId, userId);
                let result = yield post_service_1.default.getActivePostById(postId, userId);
                if (result) {
                    post_service_1.default.updateViews(result[0].id);
                }
                resp.json({
                    post: result
                });
            }
            catch (err) {
                console.log(err);
                resp.json({
                    err: err.message
                });
            }
        });
    }
    getDeactivePostById(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postId = Number(req.params.id);
                let result = yield post_service_1.default.getDeactivePostById(postId);
                if (result) {
                    post_service_1.default.updateViews(result[0].id);
                }
                resp.json({
                    post: result
                });
            }
            catch (err) {
                resp.json({
                    err: ("Error:" + err)
                });
            }
        });
    }
}
module.exports = new PostController();
