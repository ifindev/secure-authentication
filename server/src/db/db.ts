import { hashSync } from 'bcrypt';

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type RefreshToken = {
  token: string;
  userId: string;
  expiresAt: Date;
};

const users: User[] = [
  {
    id: '1',
    username: 'jdoe',
    password: hashSync('password', 10),
    email: 'jdoe@mail.com',
    firstName: 'John',
    lastName: 'Doe',
  },
];

const refreshTokens: RefreshToken[] = [];

const db = {
  users,
  refreshTokens,
};

export default db;
