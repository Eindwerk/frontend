export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  description?: string;
  role: "user" | "admin" | "super_admin";
  profile_image?: string;
  username: string;
  banner_image?: string;
}
