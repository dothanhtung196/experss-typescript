import { User } from "../database/entities/User";

export class UserModel extends User {
    constructor(user: User){
        super();
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
        this.role = user.role;
    }

    accessToken?: string;
    refreshToken?: string;
}
