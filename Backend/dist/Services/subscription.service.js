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
class SubscriptionService {
    addSubscription(subscription) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(subscription);
            let a = yield subscription_repo_1.sunscriptionRepo.query(`select * from subscriptionTable_Blog where author_id=${subscription.author} AND user_id=${subscription.user}`);
            console.log("Result:", a);
            if (a.length > 0) {
                console.log("alredy subscribed");
                return false;
            }
            else {
                yield subscription_repo_1.sunscriptionRepo.save(subscription);
                return true;
            }
        });
    }
}
module.exports = new SubscriptionService();
