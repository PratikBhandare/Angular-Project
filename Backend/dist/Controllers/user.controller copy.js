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
const user_service_1 = __importDefault(require("../Services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_dto_1 = require("../DTOS/user.dto");
const class_validator_1 = require("class-validator");
const secretKey = process.env.SECRET_KEY;
class UserController {
    registerUser(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("this is file:", req.file);
            console.log("this is Body:", req.body);
            // console.log("path:",path);
            // req.body.profileImg=path;
            try {
                let userFrombody = JSON.parse(req.body.user);
                userFrombody.profileImg = "" + req.file.originalname;
                console.log(userFrombody);
                let user = userFrombody;
                yield user_service_1.default.registerUser(user);
                resp.status(200).json({
                    msg: "Success"
                });
            }
            catch (err) {
                // next(new AppError(err,500))
                // console.log(err);
                resp.json({
                    err: err
                });
            }
        });
    }
    login(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            // let user=req.body
            let user = req.body;
            console.log(user);
            let User = yield user_service_1.default.login(user);
            console.log("From Login", User);
            let token = jsonwebtoken_1.default.sign({ User }, secretKey, { expiresIn: "1d" });
            if (yield (User)) {
                // console.log("my first node js DTO:",new USerDto(User));
                const userdto = new user_dto_1.USerDto(User);
                let err = yield (0, class_validator_1.validate)(userdto);
                if (err.length > 0) {
                    console.log("Data is Not Valid.....", err);
                }
                else {
                    console.log(User);
                    resp.json({
                        msg: "Success",
                        user: userdto,
                        token: token,
                        flag: true,
                    });
                }
            }
            else {
                resp.json({
                    msg: "Faild",
                    flag: false
                });
                console.log("Not Found..");
            }
        });
    }
    logout(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                resp.clearCookie("User", { domain: "localhost:4200", path: "/" }).json({
                    msg: "Successfullt loggedout"
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getpass(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Hello..");
        });
    }
    getUsers(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let userdata = yield user_service_1.default.getUsers();
            resp.send(userdata);
        });
    }
    getUserDaata(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = Number(req.params.id);
            let userdata = yield user_service_1.default.getUserData(id);
            // console.log(userdata);
            resp.send(userdata);
        });
    }
    getUserPosts(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = Number(req.params.id);
            let posts = yield user_service_1.default.getUserPosts(id);
            // console.log(userdata);
            resp.json({ posts: posts });
        });
    }
    deletUser(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = Number(req.params.id);
                yield user_service_1.default.deletUser(id);
                resp.json({ msg: "Success..." });
            }
            catch (err) {
                resp.json({
                    err: err
                });
            }
        });
    }
}
module.exports = new UserController();
