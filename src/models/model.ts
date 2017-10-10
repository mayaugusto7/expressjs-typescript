import { IUserModel } from "./user.model";
import { Model } from "mongoose";

export interface IModel {
    user: Model<IUserModel>;
}