import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ClaimDefinition } from "../types/claim-definition";

class JwtHelper {
    accessTokenSecret: string;
    refreshTokenSecret: string;

    constructor() {
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY || "";
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_KEY || "";
    }

    signAccessToken(claim: ClaimDefinition): string {
        const payload: object = Object.assign(claim);

        const options: SignOptions = {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRED || "5m",
        };

        try {
            let result = jwt.sign(payload, this.accessTokenSecret, options);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    verifyAccessToken(token: string): string | JwtPayload {
        try {
            let result = jwt.verify(token, this.accessTokenSecret);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    signRefreshToken(claim: object): string {
        const payload: object = Object.assign(claim);

        const options: SignOptions = {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRED || "5m",
        };

        try {
            let result = jwt.sign(payload, this.refreshTokenSecret, options);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    verifyRefreshToken(token: string): string | JwtPayload {
        try {
            let result = jwt.verify(token, this.refreshTokenSecret);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    decode(token: string): string | jwt.JwtPayload | null {
        try {
            return jwt.decode(token);
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

export default new JwtHelper();
