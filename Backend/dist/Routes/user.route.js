"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../Controllers/user.controller"));
const jwtAuth_middleware_1 = require("../Middlewares/jwtAuth.middleware");
const multer_1 = __importDefault(require("multer"));
const admin_middleware_1 = require("../Middlewares/admin.middleware");
const storage = multer_1.default.diskStorage({
    destination: (req, resp, cb) => {
        cb(null, 'C:/Training/PrimeNg/BLogWebsite/Frontend/src/assets/profile-images');
        // console.log(__dirname);
    },
    filename: (req, file, cb) => {
        // console.log(req.body);
        console.log("file in multer", file);
        console.log("C:/Training/PrimeNg/BLogWebsite/Frontend/public/assets/profile-images/" + file.originalname);
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const userRouter = express_1.default.Router();
userRouter.post("/login", user_controller_1.default.login);
userRouter.post("/logincheck", user_controller_1.default.checkLogin);
userRouter.get("/logout", user_controller_1.default.logout);
userRouter.get("/getpass", jwtAuth_middleware_1.jwtAuth, user_controller_1.default.getpass);
userRouter.post("/signUp", upload.single('pimg'), user_controller_1.default.registerUser);
userRouter.post("/uploadimg", upload.single('pimg'), user_controller_1.default.registerUser);
userRouter.get("/getUsers", user_controller_1.default.getUsers);
userRouter.delete("/deletuser/:id", jwtAuth_middleware_1.jwtAuth, admin_middleware_1.isAdmin, user_controller_1.default.deletUser);
userRouter.get("/getuserdata/:id", user_controller_1.default.getUserDaata);
userRouter.get("/getuserposts/:id", user_controller_1.default.getUserPosts);
userRouter.get("/getusersunscribedposts/:id", user_controller_1.default.getUserSunscribedPosts);
userRouter.get("/getusersubscriptions/:id", user_controller_1.default.getUserSubscriptions);
module.exports = userRouter;
