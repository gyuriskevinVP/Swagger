import express from 'express';
import cors from 'cors';
import {initializeDB} from './database.js'
import usersRouter from "./routes/users.js"
import swaggerUI from 'swagger-ui-express';
import {readFile} from 'fs/promises';

const swaggerDocument = JSON.parse(await readFile(new URL('./swagger_output.json', import.meta.url)));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500 || err.status).json({message: err.message})
})

const startServer = async () => {
    await initializeDB();
    app.listen(3000, () => console.log('Server started on port 3000'));
}

startServer();