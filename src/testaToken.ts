import express from "express";
import { Request, Response } from "express";
import validaToken from './checaTokenUser';

const router = express.Router();

router.get('/testaToken', validaToken, (req: Request, res: Response) => {
    // Se o middleware 'validaToken' não retornar erro, o token é válido
    res.status(200).send('Token é válido');
});

export default router;
