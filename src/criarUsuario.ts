import express from 'express';
import connection from './connection';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/criarUsuario', async (req: Request, res: Response) => {
    try {
        const { cpf, nome, senha, perfil, email, telefone } = req.body;

        const usuarioExistente = await connection('usuario')
            .where({ cpf: cpf })

        if (usuarioExistente.length > 0) {
            res.status(401).send("Usuário já existe.")
        }

        const saltRounds = 15;
        const salt = await bcrypt.genSalt(saltRounds);


        const hashedPassword = await bcrypt.hash(senha, salt);
        await connection.raw(`
            INSERT INTO usuario (cpf, nome, senha, perfil, email, telefone)
            VALUES (
                '${cpf}',
                '${nome}',
                '${hashedPassword}',
                '${perfil}',
                '${email}',
                '${telefone}'
            )
        
        `)

        res.status(200).send("Usuário criado com sucesso.")

    } catch (error:any) {
        console.log(error)
        res.status(500).send(`Erro no servidor: ${error.message}`)
    }
})
export default router;