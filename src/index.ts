import app from "./app";
import registraProduto from "./registraProduto";
import consultaProduto from "./consultaProduto";
import criarUsuario from "./criarUsuario";
import login from "./login";
import registraVenda from "./adicionaProduto";

// Rota para o Enpoint de Login:
app.use('/api', login)

//Rota para o Endpoint de criar um usuário (Login):
app.use('/api', criarUsuario)

//Rota para o Endpoint de criar um usuário (Login):
app.use('/api', registraProduto)

//Rota para o Endpoint de Consultar um Produto:
app.use('/api', consultaProduto)

//Rota para o Endpoint de Registrar uma venda:
app.use('/api', registraVenda)


