import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token required' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }
    next();
  });
};
