import express from "express";
import connection from "./connection";
import { Request, Response } from 'express';

const router = express.Router();

router.get('/consultaProduto', async (req: Request, res: Response) => {
    try {
        const {codprod} = req.query;
        
        const dados = await connection('produto')
            .select('*')
            .where({codprod: codprod})
        if (dados.length === 0) {
            res.status(201).send('Produto não Encontrado!')
        }    
        else{res.status(200).send(dados)}
         

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
})
export default router;