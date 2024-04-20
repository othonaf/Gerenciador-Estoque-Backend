import express from "express";
import { Request, Response } from "express";
import connection from "./connection";
import moment from 'moment-timezone';
import checaPerfil from "./checaPerfil";


const router = express.Router();

router.get('/vendasPorSemana', checaPerfil('admin'), async (req: Request, res: Response) => {

    try {
        let { dataInicio, dataFim } = req.query

        // Converte as datas para o fuso horário do banco de dados
        dataInicio = moment.tz(dataInicio, 'America/Sao_Paulo').format();
        dataFim = moment.tz(dataFim, 'America/Sao_Paulo').format();

        const vendas = await connection('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .where('data', '>=', dataInicio)
            .andWhere('data', '<=', dataFim)
            .select('*');

        let totalLucro = 0;
        const quantidadeProdutos = vendas.length;

        const vendasPorTempo = await connection('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .where('data', '>=', dataInicio)
            .andWhere('data', '<=', dataFim)
            .groupBy(connection.raw('extract(week from data)')) // Agrupa as vendas por semana do ano (MÊS)
            .select(connection.raw('extract(week from data) as semana'), connection.raw('count(*) as quantidade'));


        for (const venda of vendas) {
            if (venda.total_lucro !== null) {
                totalLucro += parseFloat(venda.total_lucro);
            }
        }

        res.status(201).json({ totalLucro, quantidadeProdutos, vendasPorTempo })

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
});
export default router;