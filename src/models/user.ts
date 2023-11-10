export interface IUser {
  id: number;
  avatarUrl?: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  lastName: string;
  passwordHash: string;
  role: "ADMIN" | "SUPER_ADMIN" | "BASIC";
}