import express from "express";
import { Request, Response } from "express";
import connection from "./connection";
import moment from 'moment-timezone';


const router = express.Router();

router.get('/dashboard', async (req: Request, res: Response) => {
    try {
        let { dataInicio, dataFim } = req.body

        dataInicio = moment.tz(dataInicio, 'America/Sao_Paulo').format();
        dataFim = moment.tz(dataFim, 'America/Sao_Paulo').format();

        const vendas = await connection('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .where('data', '>=', dataInicio)
            .andWhere('data', '<=', dataFim)
            .select('venda_produto.total_lucro');
        console.log(vendas)
        let totalLucro: number = 0;

        for (const venda of vendas) {
            if (venda.total_lucro !== null) {
                totalLucro += parseFloat(venda.total_lucro);
            }
        }

        res.status(201).json({ totalLucro })

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
});
export default router;