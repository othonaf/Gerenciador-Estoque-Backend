import express from "express";
import { Request, Response } from "express";
import connection from "./connection";

const router = express.Router();

router.post('/registraVenda', async (req: Request, res: Response) => {
    try {
        const { valorTotal, usuario, listaDeCompras } = req.body

        const venda = await connection('vendas')
        .insert({valortotal: valorTotal, vendedor: usuario}, 'id');

        const vendaId = venda[0].id; 
        for (let produto of listaDeCompras) {
            await connection('venda_produto').insert({
                venda_id: vendaId,
                produto_id: produto.codprod
            });
        }

        res.status(200).send("Venda finalizada com sucesso!");

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
});
export default router;