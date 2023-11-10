import {IUser} from "../models";

export const getInitials = (user: IUser) => user.firstName.slice(0, 1) + user.lastName.slice(0, 1)