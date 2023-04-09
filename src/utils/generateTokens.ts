import jwt from 'jsonwebtoken';

const generateTokens = (payload: { email: string; password: string }) => {
  const accessToken = jwt.sign(payload, 'access_secret', { expiresIn: '1m' });
  const refreshToken = jwt.sign(payload, 'refresh_secret', { expiresIn: '30d' });

  return { accessToken, refreshToken };
};

export default generateTokens;
