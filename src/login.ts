import express from 'express';
import connection from "./connection";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { cpf, senha } = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    };

    try {
      const result = await connection.raw(`
              SELECT * FROM usuario WHERE cpf = '${cpf}'
            `)

      //console.log(result)
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(senha, user.senha);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ nome: user.nome, cpf: user.cpf, perfil: user.perfil }, secret, {
        expiresIn: '8h', algorithm: 'HS256'
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
});

export default router;