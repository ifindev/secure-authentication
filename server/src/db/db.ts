import { hashSync } from 'bcrypt';

type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
};

type RefreshToken = {
  token: string;
  userId: string;
  expiresAt: Date;
};

export const users: User[] = [
  {
    id: '1',
    username: 'jdoe',
    password: hashSync('password', 10),
    email: 'jdoe@mail.com',
    first_name: 'John',
    last_name: 'Doe',
  },
];

export const refreshTokens: RefreshToken[] = [];
