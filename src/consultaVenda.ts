import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';


const router = express.Router();

router.get('/consultaVenda', async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const dados = await connection('venda_produto').where({ venda_id: id });

        if (dados.length === 0) {
            res.status(401).send("Venda não encontrada.")
        }
        const resposta = await connection('venda_produto')
            .select('*')
            .where({venda_id: id})

        res.status(200).send(resposta)

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
})

export default router;