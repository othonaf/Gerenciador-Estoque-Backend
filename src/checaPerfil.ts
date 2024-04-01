import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const checaPerfil = (profileRequired: string) => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string; 

  let decoded: JwtPayload | string;
  try {
    decoded = jwt.verify(token, 'f1#z8.sqt');
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (typeof decoded === 'string') {
    // Se 'decoded' for uma string, algo deu errado
    return res.status(401).json({ message: 'Token inválido' });
  }

  // 'Decoded' é do tipo JwtPayload
  if (decoded.perfil === profileRequired) {
    next();
  } else {
    res.status(403).json({ message: 'Acesso proibido' });
  }
};

export default checaPerfil;