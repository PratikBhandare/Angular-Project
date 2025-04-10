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
const like_service_1 = __importDefault(require("../Services/like.service"));
class LikeController {
    likePost(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let like = req.body;
                // console.log("THis is Like Object backend",like);
                let result = yield like_service_1.default.likePost(like);
                // resp.json({
                //     msg:"success"
                // })
                if (result == "Not Logged In...") {
                    resp.json({
                        err: "Not Logged In..."
                    });
                }
                else if (result == "Alredy Liked...") {
                    resp.json({
                        err: "Alredy Liked..."
                    });
                }
                else if (result === "success") {
                    resp.json({
                        msg: "Success"
                    });
                }
            }
            catch (err) {
                console.log("Erorr....", err);
            }
        });
    }
}
module.exports = new LikeController();
