"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Database_1 = require("./Configs/Database");
const user_route_1 = __importDefault(require("./Routes/user.route"));
const post_route_1 = __importDefault(require("./Routes/post.route"));
const like_route_1 = __importDefault(require("./Routes/like.route"));
const comment_route_1 = __importDefault(require("./Routes/comment.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./Middlewares/error.middleware");
const subscription_route_1 = __importDefault(require("./Routes/subscription.route"));
const notification_route_1 = __importDefault(require("./Routes/notification.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200', // Allow only your frontend origin
    credentials: true, // Allow credentials (cookies, HTTP authentication)
}));
app.use((0, cookie_parser_1.default)());
app.use(error_middleware_1.errorMiddleare);
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/user", user_route_1.default);
app.use("/post", post_route_1.default);
app.use("/like", like_route_1.default);
app.use("/comment", comment_route_1.default);
app.use("/subscription", subscription_route_1.default);
app.use("/notification", notification_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is started on Port ${PORT}`);
});
Database_1.AppDataSOurce.initialize()
    .then(() => {
    console.log("Connected to DataBase");
})
    .catch((err) => {
    console.log(err);
});
