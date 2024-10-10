export interface SignUpPayload {
  email: string;
  password: string;
}
export interface SignInPayload {
  email: string;
  password: string;
}

export interface StoredUser {
  email: string;
  _id: string;
  firstName: boolean;
  lastName: string;
}
export interface UserRespone {
  token: string;
  user: StoredUser;
  links?: [{ platform: string; link: string }];
}


export interface Links {
  link: string;
  platform: string;
  sequence: number;
  error?: string;
};