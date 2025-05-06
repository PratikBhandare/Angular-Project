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
const subscription_service_1 = __importDefault(require("../Services/subscription.service"));
const secretKey = process.env.SECRET_KEY;
class SubscriptionController {
    addSubscription(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sub = req.body;
                yield subscription_service_1.default.addSubscription(sub);
                resp.status(200).json({
                    msg: "success"
                });
            }
            catch (e) {
                // resp.send(e)
                // console.log("Error Object:",e.message);
                resp.status(e.statusCode).json({
                    err: e.message
                });
                console.log(e.message, e.statusCode);
                // throw new AppError(e.error.message,e.error.statusCode)
            }
        });
    }
    removeSubscription(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sub = req.body;
                yield subscription_service_1.default.removeSubscription(sub);
                resp.status(200).json({
                    msg: "success"
                });
            }
            catch (e) {
                // resp.send(e)
                // console.log("Error Object:",e.message);
                resp.status(e.statusCode).json({
                    err: e.message
                });
                console.log(e.message, e.statusCode);
                // throw new AppError(e.error.message,e.error.statusCode)
            }
        });
    }
}
module.exports = new SubscriptionController();
