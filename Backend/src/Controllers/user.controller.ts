import { NextFunction, Request, response, Response } from "express";
import userService from "../Services/user.service";
import { User } from "../Entities/users";
import jwt from "jsonwebtoken";
import { USerDto } from "../DTOS/user.dto";
import { validate, Validate } from "class-validator";
import { AppError } from "../Utils/apperror";




const secretKey: string = process.env.SECRET_KEY as string;

class UserController {
    async registerUser(req: Request, resp: Response, next: NextFunction) {
        console.log("this is file:", req.file);
        console.log("this is Body:", req.body);

        // console.log("path:",path);

        // req.body.profileImg=path;

        try {
            let userFrombody = JSON.parse(req.body.user);
            if (req.file) {
                userFrombody.profileImg = "" + req.file.originalname;
                console.log(userFrombody);
            } else {
                throw new AppError("file not found", 404)
            }


            let user: Partial<User> = userFrombody;
            const userDTO = new USerDto()

            Object.assign(userDTO, user)


            let error = await validate(userDTO);
            console.log(error);

            if (error.length > 0) {
                console.log("Data is Not Valid.....", error);
                const errorMessages = error.map(err => Object.values(err.constraints)).join(', ')
                throw new AppError(errorMessages, 400)
            }

            ;
            await userService.registerUser(userDTO);
            resp.status(200).json({
                msg: "Success"
            })
        } catch (err) {

            console.log(err.message);
            resp.status(err.statusCode).json({
                err: err.message
            })
        }


    }

    async login(req: Request, resp: Response) {



        let user: Partial<User> = req.body;
        console.log(user);

        let User: any = await userService.login(user);
        console.log("From Login", User);

        let token = jwt.sign({ User }, secretKey, { expiresIn: "1d" })



        if (await (User)) {
            // console.log("my first node js DTO:",new USerDto(User));

            const userdto = new USerDto()
            Object.assign(userdto, User)

            console.log("User to Validate", User);


            let err = await validate(userdto);
            console.log("Responsee:", userdto);

            if (err.length > 0) {
                console.log("Data is Not Valid.....", err);


            } else {
                console.log(User);
                resp.json({
                    msg: "Success",
                    user: User,
                    token: token,
                    flag: true,
                })

            }


        } else {
            resp.json({
                msg: "Faild",
                flag: false
            })
            console.log("Not Found..")

        }



    }

    async checkLogin(req: Request, resp: Response) {
        let token = req.body.token;
        console.log("THis is token", token);


        // console.log("Cookies:",req.cookies.token);


        if (token && token.startsWith("Bearer")) {
            console.log(token);
            token = token.split(" ")[1]

            try {
                let result = jwt.verify(token!, secretKey);
                console.log("this is Token verification", typeof result);
                resp.status(200).json({
                    user: result
                })
            } catch (err) {
                console.log(err);
                console.log("Invalid.user");
                return;
            }

        }

    }

    async logout(req: Request, resp: Response) {
        try {
            resp.clearCookie("User", { domain: "localhost:4200", path: "/" }).json({
                msg: "Successfullt loggedout"
            });
        } catch (err) {
            console.log(err);

        }

    }

    async getpass(req: Request, resp: Response) {
        console.log("Hello..");



    }

    async getUsers(req: Request, resp: Response) {


        let userdata = await userService.getUsers()

        resp.send(userdata);
    }

    async getUserDaata(req: Request, resp: Response) {
        let id = Number(req.params.id);

        let userdata = await userService.getUserData(id)
        console.log("Data to check:", userdata);

        resp.send(userdata);
    }

    async getUserSubscriptions(req: Request, resp: Response) {
        let r = await userService.getUserSubscription(Number(req.params.id))
        console.log(r);
        

        resp.json({
            result: r
        })
    }

    async getUserPosts(req: Request, resp: Response) {
        let id = Number(req.params.id);

        let posts = await userService.getUserPosts(id)
        // console.log(userdata);

        resp.json({ posts: posts });
    }

    async getUserSunscribedPosts(req: Request, resp: Response) {
        let id = Number(req.params.id);

        let posts = await userService.getUserSunscribedPosts(id)
        // console.log(userdata);

        resp.status(200).json({ userSubscribedPosts: posts });
    }

    async deletUser(req: Request, resp: Response) {
        try {
            let id = Number(req.params.id);

            await userService.deletUser(id)


            resp.json({ msg: "Success..." });
        } catch (err) {
            resp.json({
                err: err
            })
        }
    }


}

export = new UserController();