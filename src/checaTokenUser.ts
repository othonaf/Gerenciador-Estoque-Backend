import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extendendo a interface Request para incluir a propriedade usuario
declare global {
  namespace Express {
    interface Request {
      usuario?: any;
    }
  }
}

const validaToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Token não fornecido');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).send('Erro no token');
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send('Token mal formatado');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const usuario = jwt.verify(token, secret);

        // Você pode adicionar o usuário ao objeto de requisição para que você possa acessá-lo em rotas protegidas
        req.usuario = usuario;

        return next(); // Chama a próxima rota
    } catch (error) {
        console.log(error);
        return res.status(500).send('Erro ao verificar o token.');
    }
};

export default validaToken;
