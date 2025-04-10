export class AppError extends Error{
    public statusCode:number;
    public isOeprational:boolean;

    constructor(message:string,statusCode:number){
        super(message);
        this.statusCode=statusCode;
        this.isOeprational=true;
        Error.captureStackTrace(this,this.constructor)
    }

    

}