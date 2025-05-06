"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSOurce = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("../Entities/users");
const post_1 = require("../Entities/post");
const like_1 = require("../Entities/like");
const comment_1 = require("../Entities/comment");
const subscription_1 = require("../Entities/subscription");
const notification_1 = require("../Entities/notification");
exports.AppDataSOurce = new typeorm_1.DataSource({
    type: "mssql",
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    synchronize: true,
    logging: true,
    entities: [users_1.User, post_1.Post, comment_1.Comment, like_1.Like, subscription_1.Subscription, notification_1.Notification],
    options: {
        trustServerCertificate: true,
        encrypt: true
    }
});
