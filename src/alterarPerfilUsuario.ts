import express from "express";
import { Request, Response } from "express";
import connection from "./connection";
import checaPerfil from "./checaPerfil";


const router = express.Router();

router.put('/alterarPerfil', checaPerfil('admin'), async (req: Request, res: Response) => {
    try {
        const { cpf } = req.body;

        if (cpf.length === 0) {
            res.status(400).send("Usuário não encontrado.")
        }
        await connection('usuario')
            .update({ perfil: 'admin' })
            .where({ cpf: cpf })

        res.status(200).send("Perfil de Usuário alterado com sucesso.")
    } catch (error) {
        console.log(error)
        res.status(500).send("Erro no servidor.")
    }
});
export default router;