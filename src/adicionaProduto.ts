import connection from "./connection";
import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.post('/adicionaProduto', async (req: Request, res: Response) => {
    try {
        let listaDeCompras = [];
        let valorTotal = 0;

        const { codprod } = req.body;

        const item = await connection('produto')
            .where({ codprod: codprod })

        if (item.length > 0) {
            listaDeCompras.push(item[0]);
            valorTotal += parseFloat(item[0].valordevenda);

            res.status(200).send({
                message: "Produto adicionado com sucesso!",
                produto: item[0],
                valorTotal: valorTotal
            });
        } else {
            res.status(404).send("Produto não encontrado.");
        }


    } catch (error) {
        console.log(error)
        res.status(500).send("Sem acesso ou erro no servidor.")
    }
})
export default router;