import dotenv from 'dotenv';

dotenv.config();

const configs = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  nodeEnv: process.env.NODE_ENV,
  refreshTokenExpiration: 1 * 60 * 60 * 1000,
  port: process.env.PORT || 5000,
};

export default configs;
