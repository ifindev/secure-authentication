import { hashSync } from 'bcrypt';

type User = {
  id: string;
  username: string;
  password: string;
};

type RefreshToken = {
  token: string;
  userId: string;
  expiresAt: Date;
};

export const users: User[] = [
  {
    id: '1',
    username: 'user1',
    password: hashSync('password1', 10),
  },
];

export const refreshTokens: RefreshToken[] = [];
