import express from "express";
import { Request, Response } from "express";
import connection from "./connection";

const router = express.Router();

router.post('/finalizaVenda', async (req: Request, res: Response) => {
    try {
        
        res.status(200).send("Venda finalizada com sucesso!");

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
})