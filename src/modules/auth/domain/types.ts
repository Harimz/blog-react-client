export type AuthResponse = {
  token: string;
  expiresIn: number;
};

export type UserResponse = {
  id: string;
  email: string;
  name: string;
  role?: string;
  createdAt: string;
};
