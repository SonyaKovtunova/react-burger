import { IUser } from "./user";

export interface IAuthResponse {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: IUser,
    message: string,
}