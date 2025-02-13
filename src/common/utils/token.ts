import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY!;

export const generateToken = (payload: object): string => jwt.sign(payload, secretKey, { expiresIn: '1d' });

export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
