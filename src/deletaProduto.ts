import express from "express";
import connection from "./connection";
import { Request, Response } from "express";

const router = express.Router();

router.delete('/deletaProduto', async (req: Request, res: Response) => {
    const {codprod} = req.query;

    try {
        const produto = await connection('produto').where({ codprod: codprod });
        if (produto.length > 0) {
            await connection('produto')
                .where({ codprod: codprod })
                .delete('*')

            res.status(200).send('Produto Deletado com sucesso!')
        }
        else {
            res.send('Produto não encontrado ou código de barras incorreto.')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor!")
    }
});

export default router;
