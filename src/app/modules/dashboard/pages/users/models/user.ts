export interface User {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  password: string;
  address: string;
  phone: string;
  profile: Profile;
  // profile: string;
}

export type Profile = "ADMIN" | "USER";
export const USER_PROFILE: Profile[] = ['ADMIN', 'USER'];
