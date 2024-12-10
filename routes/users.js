import express from 'express';
import { dbQuery, dbRun } from '../database.js';

const router = express.Router();

// Minden user megjelenítése --> GET
router.get('/', async (req, res, next) => {
    try{
        const users = await dbQuery('SELECT * FROM users;');
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

// ID alapjan user megjelenítése --> GET:ID
router.get('/:id', async (req, res, next) => {
    try{
        const [users] = await dbQuery('SELECT * FROM users WHERE id = ?;', [req.params.id]);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

// User hozzáadás --> POST
router.post('/', async (req, res, next) => {
    try{
        const {firstName, lastName, email, whichClass} = req.body;
        await dbRun('INSERT INTO users (firstName, lastName, email, whichClass) VALUES (?, ?, ?, ?);', [firstName, lastName, email, whichClass]);
        res.status(201).json({message: 'User sikeresen hozzáadva.'});
    } catch (err) {
        next(err);
    }
});

//User modositás ID alapján --> PUT
router.put('/:id', async (req, res, next) => {
    try{
        const {firstName, lastName, email, whichClass} = req.body;
        await dbRun('UPDATE users SET firstName = ?, lastName = ?, email = ?, whichClass = ? WHERE id = ?;', [firstName, lastName, email, whichClass, req.params.id]);
        res.status(200).json({message: 'User sikeresen frissítve.'});
    } catch (err) {
        next(err);
    }
});

//User törlése ID alapján --> DELETE
router.delete('/:id', async (req, res, next) => {
    try{
        await dbRun('DELETE FROM users WHERE id = ?;', [req.params.id]);
        res.status(200).json({message: 'User sikeresen törölve.'});
    } catch (err) {
        next(err);
    }
});

export default router;