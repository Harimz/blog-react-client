export type AuthResponse = {
  token: string;
  expiresIn: number;
};

export type UserResponse = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role?: string;
  createdAt: string;
};
