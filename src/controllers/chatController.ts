import { Request, Response } from 'express';
import { db } from '../models/db';
import multer from 'multer';
import xlsx from 'xlsx';

const upload = multer({ dest: 'uploads/' });

export const fileUpload = upload.single('file');

export const uploadExcel = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
        res.status(400).json({ message: 'No file uploaded' });
        return
    }

    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const chats: any[] = xlsx.utils.sheet_to_json(sheet);

    for (const chat of chats) {
      await db.execute('INSERT INTO chats (user, message, timestamp, status) VALUES (?, ?, ?, ?)', [
        chat.User,
        chat.Message,
        chat.Timestamp,
        chat.Status || 'pending',
      ]);
    }

    res.json({ message: 'Chats imported successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Import failed', error: err });
  }
};

export const getChats = async (req: Request, res: Response) => {
  const { filter } = req.query;
  let query = 'SELECT * FROM chats';

  if (filter === 'completed') query += ' WHERE status = \"completed\"';
  if (filter === 'pending') query += ' WHERE status = \"pending\"';

  const [rows] = await db.execute(query);
  res.json({"data":rows});
};
