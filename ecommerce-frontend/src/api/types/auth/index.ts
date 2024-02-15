export type UserCredentialsType = {
  username: string;
  password: string;
};

export type AuthResponseType = {
  tokenType: string;
  accessToken: string;
};

export const defaultUserCredentials: UserCredentialsType = {
  username: '',
  password: '',
};
