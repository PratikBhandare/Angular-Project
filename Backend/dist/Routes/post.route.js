"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const jwtAuth_middleware_1 = require("../Middlewares/jwtAuth.middleware");
const post_controller_1 = __importDefault(require("../Controllers/post.controller"));
const multer_1 = __importDefault(require("multer"));
const admin_middleware_1 = require("../Middlewares/admin.middleware");
const postOperation_miidleware_1 = require("../Middlewares/postOperation.miidleware");
const storage = multer_1.default.diskStorage({
    destination: (req, resp, cb) => {
        cb(null, 'C:/Training/PrimeNg/BLogWebsite/Frontend/src/assets/Blog-images');
        // console.log(__dirname);
    },
    filename: (req, file, cb) => {
        // console.log(req.file);
        console.log("file in multer", file);
        let postTitle = req.body;
        console.log("posttitle:", postTitle);
        // console.log("C:/Training/PrimeNg/BLogWebsite/Frontend/public/assets/Blog-images/"+file.originalname);
        // console.log(file.path);
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const postRouter = express_1.default.Router();
postRouter.post("/create", jwtAuth_middleware_1.jwtAuth, post_controller_1.default.creatPost);
postRouter.post("/uplodimg", upload.single('bimg'), post_controller_1.default.getImage);
postRouter.patch("/update/:id", post_controller_1.default.updatePost);
postRouter.delete("/delete/:id", postOperation_miidleware_1.postOperation, post_controller_1.default.deletPost);
postRouter.get("/activatepost/:id", admin_middleware_1.isAdmin, post_controller_1.default.activatePost);
postRouter.get("/getActiveposts", post_controller_1.default.getActivePosts);
postRouter.get("/getDeActiveposts", admin_middleware_1.isAdmin, post_controller_1.default.getDeActivePosts);
postRouter.get("/getposts", admin_middleware_1.isAdmin, post_controller_1.default.getPosts);
postRouter.get("/getpostsbycategory/:category", post_controller_1.default.getPostsByCategory);
postRouter.get("/getpostbyid/:id", post_controller_1.default.getActivePostById);
postRouter.get("/getpost/likes/:id", post_controller_1.default.getPostsLikes);
module.exports = postRouter;
