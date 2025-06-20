import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../models/db';
import {SECRET_KEY} from "../middlewares/auth"

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  res.status(201).json({ message: 'User registered' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const [rows]: any = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const user = rows[0];
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).json({ message: 'Invalid password' });
    return;
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
};
