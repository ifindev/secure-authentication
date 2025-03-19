import { hashSync } from 'bcrypt';

type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
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
    firstName: 'John',
    lastName: 'Doe',
  },
];

export const refreshTokens: RefreshToken[] = [];
