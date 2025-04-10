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
const user_repo_1 = require("../Repositories/user.repo");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash the password using the Promise version of bcrypt.hash
            const hashedPass = yield bcrypt_1.default.hash(user.password, 10);
            user.password = hashedPass;
            // Save the user to the database
            yield user_repo_1.userRepo.save(user);
            // console.log("User registered:", user);
            // console.log("Hashed password:", hashedPass);
        });
    }
    deletUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_repo_1.userRepo.delete({ id: id });
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the user by email
                const result = yield user_repo_1.userRepo.findOneBy({ email: user.email });
                if (!result) {
                    console.log("User not found");
                    return;
                }
                // Compare the password using bcrypt.compare (Promise-based)
                const isMatch = yield bcrypt_1.default.compare(user.password, result.password);
                if (isMatch) {
                    console.log("Password is Matched ...");
                    return result; // Return the user data if the password matches
                }
                else {
                    console.log("Password is incorrect");
                    return null; // Return null or handle invalid login
                }
            }
            catch (err) {
                console.log("Error during login:", err);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield user_repo_1.userRepo.find({
                relations: {
                    posts: true,
                    // likes:true
                },
            });
            console.log(result);
            return result;
        });
    }
    getUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            let result = yield user_repo_1.userRepo.findOne({
                relations: {
                    posts: true,
                    likes: true
                },
                where: { id: id }
            });
            console.log(result);
            return result;
        });
    }
    getUserPosts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            let result = yield user_repo_1.userRepo.findOne({
                relations: {
                    posts: { author: true },
                },
                where: { id: id }
            });
            console.log(result);
            return result.posts;
        });
    }
}
module.exports = new UserService();
