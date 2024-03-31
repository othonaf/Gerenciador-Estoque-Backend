import express from "express";
import { Request, Response } from "express";
import connection from "./connection";

const router = express.Router();

router.post('/registraVenda', async (req: Request, res: Response) => {
    try {
        const { valorTotal, usuario, listaDeCompras } = req.body
        //Código para registrar a venda:
        const venda = await connection('vendas')
            .insert({ valortotal: valorTotal, vendedor: usuario }, 'id');

        const vendaId = venda[0].id;
        for (let produto of listaDeCompras) {
            const lucro = produto.valordevenda - produto.valordecompra
            console.log(lucro)
            await connection('venda_produto').insert({
                venda_id: vendaId,
                produto_id: produto.codprod,
                total_lucro: lucro
            });
        }
        //Código para atualizar a quantidade de produtos em estoque:
        for (let produto of listaDeCompras) {
            const result = await connection('produto')
                .select('quantidade').where({ codprod: produto.codprod });
            const quantidadeEmEstoque = parseFloat(result[0].quantidade);
            
            const quantidadeVendida = produto.quantidade;
            
            const atualizaEstoque = quantidadeEmEstoque - quantidadeVendida;

            await connection('produto').where({ codprod: produto.codprod }).update({ quantidade: atualizaEstoque });
        };

        res.status(200).send("Venda finalizada com sucesso!");

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
});
export default router;