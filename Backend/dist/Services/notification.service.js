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
const notification_repo_1 = require("../Repositories/notification.repo");
class NotificationService {
    addNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            notification_repo_1.notificationRepo.save(notification);
        });
    }
    getNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield notification_repo_1.notificationRepo.find({ relations: {
                    user: true
                } });
            return r;
        });
    }
}
module.exports = new NotificationService();
