export interface IResponseUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IUser extends IResponseUser {
  password: string;
}
