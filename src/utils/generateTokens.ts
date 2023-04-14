import jwt from 'jsonwebtoken';

const secretAccessToken = process.env.SECRET_ACCESS_TOKEN || '';
const secretRefreshToken = process.env.SECRET_ACCESS_TOKEN || '';

export interface TokenPayload {
  email: string;
  password: string;
  userID: string;
}
const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, secretAccessToken, { expiresIn: '1m' });
  const refreshToken = jwt.sign(payload, secretRefreshToken, { expiresIn: '30d' });

  return { accessToken, refreshToken };
};

export default generateTokens;
