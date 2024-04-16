import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import connection from './connection';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/emailResetaSenha', async (req: Request, res: Response) => {
    const { email } = req.body;

    const usuarios = await connection('usuario')
        .where({ email: email })
    if (usuarios.length === 0) {
        return res.status(404).send('Usuário não encontrado.');
    }

    const usuario = usuarios[0];

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign(usuario, secret, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {ciphers: "SSLv3"}
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Redefinição de Senha',
        text: `Você solicitou a redefinição de senha. Por favor, clique no link abaixo para redefinir sua senha: \nhttps://bomboniere-vanessa-frontend.vercel.app/TelaDeResetSenha?token=${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao enviar o e-mail.');
        } else {
            return res.status(200).send('E-mail de redefinição de senha enviado com sucesso.');
        }
    });
});

export default router;
