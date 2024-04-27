import express from "express";
import { Request, Response } from "express";
import connection from "./connection";
import moment from 'moment-timezone';
import checaPerfil from "./checaPerfil";


const router = express.Router();

router.get('/vendasPorDia', checaPerfil('admin'), async (req: Request, res: Response) => {

    try {
        let { dataInicio, dataFim } = req.query

        // Converte as datas para o fuso horário do banco de dados
        dataInicio = moment.tz(dataInicio, 'America/Sao_Paulo').format();
        dataFim = moment.tz(dataFim, 'America/Sao_Paulo').format();

        //Query para buscar dados para cálculo do LUCRO TOTAL: 
        const vendas = await connection('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .where('data', '>=', `'${dataInicio}'`)
            .andWhere('data', '<=', `'${dataFim}'`)
            .select('*')


        //Query para buscar dados para A QUANTIDADE DE PRODUTOS VENDIDOS: 
        const quantidadeVendas = await connection('vendas')
            .where('data', '>=', `'${dataInicio}'`)
            .andWhere('data', '<=', `'${dataFim}'`)
            .sum('qtde_total_prod as quantidadeProdutos');

        const quantidadeProdutos = quantidadeVendas[0].quantidadeProdutos;

        let totalLucro = 0;
        // Query para calcular os lucros por venda:
        const lucroPorVenda = await connection<Record<string, any>>('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .where('data', '>=', dataInicio)
            .andWhere('data', '<=', dataFim)
            .groupBy(connection.raw('extract(hour from data)'))
            .select(
                connection.raw('extract(hour from data) as hora'),
                connection.raw('sum(venda_produto.total_lucro) as totalLucro')
            );
            
        // Query para calcular as vendas por tempo:
        const vendasPorTempo = await connection<Record<string, any>>('vendas')
            .where('data', '>=', dataInicio)
            .andWhere('data', '<=', dataFim)
            .groupBy(connection.raw('extract(hour from data)'))
            .select(
                connection.raw('extract(hour from data) as hora'),
                connection.raw('count(*) as quantidade'),
            );

        

        const vendasPorVendedor = await connection('vendas')
            .join('venda_produto', 'vendas.id', '=', 'venda_produto.venda_id')
            .join('usuario', 'vendas.vendedor', '=', 'usuario.cpf') // Junta com a tabela 'usuario'
            .where(connection.raw('data AT TIME ZONE \'America/Sao_Paulo\''), '>=', dataInicio)
            .andWhere(connection.raw('data AT TIME ZONE \'America/Sao_Paulo\''), '<=', dataFim)
            .groupBy('usuario.nome') // Agrupa as vendas por nome do vendedor
            .select('usuario.nome', connection.raw('count(*) as quantidade'));

        for (const venda of vendas) {
            if (venda.total_lucro !== null) {
                totalLucro += parseFloat(venda.total_lucro);
            }
        }

        res.status(201).json({ totalLucro, quantidadeProdutos, vendasPorTempo, vendasPorVendedor, lucroPorVenda })

    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
});
export default router;