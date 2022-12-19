import stringHelper from "../../core/common/string-helper";
import { AppDataSource } from "../data-source";
import { Role } from "../entities/role";
import { User } from "../entities/User";

class UserSeed {
    async InitialData() {
        let adminRole = await AppDataSource.createQueryBuilder()
            .select("role")
            .from(Role, "role")
            .where("code = :code", { code: "Admin" })
            .getOne();

        let memberRole = await AppDataSource.createQueryBuilder()
            .select("role")
            .from(Role, "role")
            .where("code = :code", { code: "Member" })
            .getOne();

        let clientRole = await AppDataSource.createQueryBuilder()
            .select("role")
            .from(Role, "role")
            .where("code = :code", { code: "Client" })
            .getOne();

        let adminUser = new User();
        adminUser.username = "administrator";
        adminUser.password = await stringHelper.hashPassword("admin@123");
        adminUser.fullName = "Administrator";
        adminUser.phone = "0987654321";
        adminUser.email = "admin@admin.com";
        adminUser.address = "Tp HCM";
        adminUser.lastLoginIp = "";
        adminUser.lastLoginTime = new Date();
        adminUser.deleteFlag = false;
        adminUser.createdBy = 0;
        adminUser.updatedBy = 0;
        if (adminRole) adminUser.role = adminRole;

        let memberUser = new User();
        memberUser.username = "member";
        memberUser.password = await stringHelper.hashPassword("admin@123");
        memberUser.fullName = "Member";
        memberUser.phone = "0987654321";
        memberUser.email = "admin@admin.com";
        memberUser.address = "Tp HCM";
        memberUser.lastLoginIp = "";
        memberUser.lastLoginTime = new Date();
        memberUser.deleteFlag = false;
        memberUser.createdBy = 0;
        memberUser.updatedBy = 0;
        if (memberRole) memberUser.role = memberRole;

        let clientUser = new User();
        clientUser.username = "client";
        clientUser.password = await stringHelper.hashPassword("admin@123");
        clientUser.fullName = "Client";
        clientUser.phone = "0987654321";
        clientUser.email = "admin@admin.com";
        clientUser.address = "Tp HCM";
        clientUser.lastLoginIp = "";
        clientUser.lastLoginTime = new Date();
        clientUser.deleteFlag = false;
        clientUser.createdBy = 0;
        clientUser.updatedBy = 0;
        if (clientRole) clientUser.role = clientRole;

        await AppDataSource.manager.save([adminUser, memberUser, clientUser]);
    }
}

export default new UserSeed();
