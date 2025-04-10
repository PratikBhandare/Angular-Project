"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleare = void 0;
const apperror_1 = require("../Utils/apperror");
const errorMiddleare = (err, req, resp, next) => {
    console.log("Error:", err.message);
    if (err instanceof apperror_1.AppError) {
        resp.status(err.statusCode).json({
            status: "err",
            message: err.message,
        });
    }
    resp.status(500).json({
        status: "error",
        message: "Something Went Wrong!",
    });
    next();
};
exports.errorMiddleare = errorMiddleare;
