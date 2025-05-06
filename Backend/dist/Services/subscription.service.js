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
const subscription_repo_1 = require("../Repositories/subscription.repo");
const apperror_1 = require("../Utils/apperror");
class SubscriptionService {
    addSubscription(subscription) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(subscription);
            let a = yield subscription_repo_1.sunscriptionRepo.query(`select * from subscriptionTable_Blog where author_id=${subscription.author} AND user_id=${subscription.user} `);
            console.log("Result:", a);
            if (a.length > 0) {
                if (a[0].isActive == true) {
                    console.log("alredy subscribed");
                    throw new apperror_1.AppError("Alredy subscribed", 409);
                }
                else {
                    console.log("else BLog", a);
                    yield subscription_repo_1.sunscriptionRepo.update({ id: a[0].id }, { isActive: true });
                }
            }
            else {
                yield subscription_repo_1.sunscriptionRepo.save(subscription);
            }
        });
    }
    removeSubscription(subscription) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(subscription);
            let a = yield subscription_repo_1.sunscriptionRepo.query(`select * from subscriptionTable_Blog where author_id=${subscription.author} AND user_id=${subscription.user}`);
            console.log("Result:", a);
            if (a.length > 0) {
                console.log("alredy subscribed");
                throw new apperror_1.AppError("Alredy subscribed", 409);
            }
            else {
                yield subscription_repo_1.sunscriptionRepo.save(subscription);
            }
        });
    }
}
module.exports = new SubscriptionService();
