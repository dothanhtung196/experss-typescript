import bcrypt from "bcrypt";

class StringHelper {
    async hashPassword(password: string): Promise<string> {
        try {
            let round = process.env.ROUND;
            const salt = await bcrypt.genSaltSync(Number(round));

            let result = await bcrypt.hashSync(password, salt);
            if (result) return result;
            else return "";
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        try {
            var result = await bcrypt.compareSync(password, hash);

        if (result) return result;
        else return false;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    getToken(headerField: string): string | "" {
        let authHeader: string = headerField;
        let bearerToken: Array<string> = authHeader.split(" ");
        let token: string = bearerToken[1];
        if (!token) return "";
        return token;
    }
}

export default new StringHelper();
