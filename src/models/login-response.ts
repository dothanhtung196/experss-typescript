import { User } from "../database/entities/User";

export class LoginResponse {
    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.fullName = user.fullName;
        this.phone = user.phone;
        this.email = user.email;
        this.address = user.address;
        this.lastLoginIp = user.lastLoginIp;
        this.lastLoginTime = user.lastLoginTime;
        this.deleteFlag = user.deleteFlag;
        this.createdAt = user.createdAt;
        this.createdBy = user.createdBy;
        this.updatedAt = user.updatedAt;
        this.updatedBy = user.updatedBy;
    }

    id: number;
    username: string;
    password: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    lastLoginIp: string;
    lastLoginTime: Date;
    deleteFlag: boolean;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
    accessToken?: string;
    refreshToken?: string;
}
