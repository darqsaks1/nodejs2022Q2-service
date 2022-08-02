export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  email: string;
  sub: string;
}
