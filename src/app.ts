import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));