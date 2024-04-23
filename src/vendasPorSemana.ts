import express from "express";
import { Request, Response } from "express";
import connection from "./connection";
import moment from 'moment-timezone';
import checaPerfil from "./checaPerfil";


const router = express.Router();

router.get('/vendasPorSemana', checaPerfil('admin'), async (req: Request, res: Response) => {
    interface Item {
        dia: number;
        quantidade: number;
    }
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

        const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

        const vendasPorTempo = await connection('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .where(connection.raw('data AT TIME ZONE \'America/Sao_Paulo\''), '>=', dataInicio)
            .andWhere(connection.raw('data AT TIME ZONE \'America/Sao_Paulo\''), '<=', dataFim)
            .groupBy(connection.raw('extract(dow from data AT TIME ZONE \'America/Sao_Paulo\')')) // Agrupa as vendas por dia da semana
            .select(
                connection.raw('extract(dow from data AT TIME ZONE \'America/Sao_Paulo\') as dia'),
                connection.raw('count(*) as quantidade'),
                connection.raw('sum(venda_produto.total_lucro) as totalLucro') // Soma o lucro total para cada dia da semana
            )
            .then(results => results.map((item: Item) => ({
                ...item,
                dia: diasDaSemana[item.dia], // Converte o número do dia para o nome do dia
            })));

            const vendasPorVendedor = await connection('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .where(connection.raw('data AT TIME ZONE \'America/Sao_Paulo\''), '>=', dataInicio)
            .andWhere(connection.raw('data AT TIME ZONE \'America/Sao_Paulo\''), '<=', dataFim)
            .groupBy('vendedor') // Agrupa as vendas por vendedor
            .select('vendedor', connection.raw('count(*) as quantidade'));


        for (const venda of vendas) {
            if (venda.total_lucro !== null) {
                totalLucro += parseFloat(venda.total_lucro);
            }
        }



        res.status(201).json({ vendasPorTempo, totalLucro, quantidadeProdutos, vendasPorVendedor })

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
});
export default router;