export interface User {
  id: number;
  email: string;
  name: string;
  accessToken: string;
  password: string;
  address: string;
  phone: string;
  profile: "ADMIN" | "USER";
}
