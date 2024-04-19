import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const checaPerfil = (profileRequired: string) => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string; 
  const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    };

  let decoded: JwtPayload | string;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).send('Token inválido, erro no Token.');
  }

  if (typeof decoded === 'string') {
    // Se 'decoded' for uma string, algo deu errado
    return res.status(401).send('Token inválido, Erro de string' );
  }

  // 'Decoded' é do tipo JwtPayload
  if (decoded.perfil === profileRequired) {
    next();
  } else {
    res.status(403).send('Acesso proibido');
  }
};

export default checaPerfil;