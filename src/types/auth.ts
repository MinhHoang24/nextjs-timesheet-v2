export interface LoginData {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

export interface AuthResponse {
  result: {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: string;
  };
}