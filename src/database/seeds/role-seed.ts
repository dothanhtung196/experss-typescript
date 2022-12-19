import { AppDataSource } from "../data-source";
import { Role } from "../entities/role";

class RoleSeed {
    async initialData() {
        let adminRole = new Role();
        adminRole.code = "Admin";
        adminRole.name = "Admin";
        adminRole.deleteFlag = false;
        adminRole.createdBy = 0;
        adminRole.updatedBy = 0;

        let userRole = new Role();
        userRole.code = "Member";
        userRole.name = "Member";
        userRole.deleteFlag = false;
        userRole.createdBy = 0;
        userRole.updatedBy = 0;

        let clientRole = new Role();
        clientRole.code = "Client";
        clientRole.name = "Client";
        clientRole.deleteFlag = false;
        clientRole.createdBy = 0;
        clientRole.updatedBy = 0;

        await AppDataSource.manager.save([adminRole, userRole, clientRole]);
    }
}

export default new RoleSeed();
