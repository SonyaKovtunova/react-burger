import { ICommonResponse } from "./common-response";
import { IUser } from "./user";

export interface IAuthResponse extends ICommonResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}