import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';


const router = express.Router();

router.post('/registraProduto', async (req: Request, res: Response) => {
    const { codprod, descricao, valordecompra, valordevenda, vencimento, quantidade, setor } = req.body;
    try {
        const dados = await connection('produto').where({ codprod: codprod });

        if (dados.length > 0) {
            res.status(401).send("Produto já cadastrado.")
        }
        await connection('produto')
            .insert({ codprod, descricao, valordecompra, valordevenda, vencimento, quantidade, setor })

        res.status(200).send("Registro criado com sucesso!")

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
})

export default router;