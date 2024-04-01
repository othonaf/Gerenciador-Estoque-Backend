import app from "./app";
import registraProduto from "./registraProduto";
import consultaProduto from "./consultaProduto";
import criarUsuario from "./criarUsuario";
import login from "./login";
import adicionaProduto from "./adicionaProduto";
import registraVenda from "./registraVenda";
import editaProduto from "./editaProduto";
import consultaVenda from "./consultaVenda";
import dashboard from "./dashboard";
import alteraPerfilUsuario from "./alterarPerfilUsuario";

// Rota para o Enpoint de Login:
app.use('/api', login)

//Rota para o Endpoint de criar um usuário (Login):
app.use('/api', criarUsuario)

//Rota para o Endpoint de criar um usuário (Login):
app.use('/api', registraProduto)

//Rota para o Endpoint de Consultar um Produto:
app.use('/api', consultaProduto)

//Rota para o Endpoint de ADICIONAR um PRODUTO:
app.use('/api', adicionaProduto)

//Rota para o Endpoint de REGISTRAR UMA VENDA:
app.use('/api', registraVenda);

//Rota para o Endpoint de Editar Produto:
app.use('/api', editaProduto);

//Rota para o Endpoint Consultar uma Venda:
app.use('/api', consultaVenda);

//Rota para o Endpoint Consultar uma Venda:
app.use('/api', dashboard);

//Rota para o Endpoint alterar perfil de usuário:
app.use('/api', alteraPerfilUsuario);


