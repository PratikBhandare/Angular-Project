import { Exclude } from "class-transformer";
import { IsEmail, IsIn, IsNotEmpty, isNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class USerDto {

  

    @IsString()
    @IsNotEmpty()
    @MaxLength(10, { message: "length is greater than 10" })
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @Exclude()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsIn(["Admin", "User"])
    role: string;

    @IsString()
    profileImg: string;
    // constructor(user) {


    //     this.name = user.name;

    //     this.email = user.email

    //     this.password = user.password

    //     this.role = user.role;

    //     this.profileImg = user.profileImg;
    // }
}
