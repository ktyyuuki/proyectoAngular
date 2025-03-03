export interface User {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  password: string;
  address: string;
  phone: string;
  // profile: "ADMIN" | "USER";
  profile: string;
}
