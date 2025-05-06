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
const notification_service_1 = __importDefault(require("../Services/notification.service"));
class NotificationController {
    addNotification(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let notification = req.body;
                console.log(notification);
                notification_service_1.default.addNotification(notification);
                resp.json({
                    msg: "success"
                });
            }
            catch (e) {
                console.log("this is error Object:", e);
                // throw new AppError(E)
            }
        });
    }
    getNotification(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield notification_service_1.default.getNotification();
            resp.status(200).send(r);
        });
    }
}
module.exports = new NotificationController();
