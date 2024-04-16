import express, { Request, Response } from 'express';
import connection from './connection';
import validaToken from './checaTokenUser';
import bcrypt from 'bcrypt';

const router = express.Router();

router.put('/resetaSenha', validaToken, async (req: Request, res: Response) => {
    const { senha } = req.body;
    const { usuario } = req;
    console.log(usuario)

    try {
        const saltRounds = 15;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        await connection('usuario')
            .where({ cpf: usuario.cpf })
            .update({ senha: hashedPassword });

        res.status(200).send('Senha redefinida com sucesso.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao redefinir a senha.');
    }
});

export default router;
