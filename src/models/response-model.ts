export class ResponseModel{
    status?: string;
    message?: string;
    data?: any;
    isError?: boolean;

    constructor(data: any = null, message: string = "Success!",  isError: boolean = false, status: string = "200"){
        this.status = status;
        this.message = message;
        this.data = data;
        this.isError = isError;
    }
}