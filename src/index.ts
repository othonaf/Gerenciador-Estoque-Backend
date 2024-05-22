import app from "./app";
import registraProduto from "./registraProduto";
import consultaProduto from "./consultaProduto";
import criarUsuario from "./criarUsuario";
import login from "./login";
import adicionaProduto from "./adicionaProduto";
import registraVenda from "./registraVenda";
import editaProduto from "./editaProduto";
import consultaVenda from "./consultaVenda";
import alteraPerfilUsuario from "./alterarPerfilUsuario";
import emailResetaSenha from "./emailResetaSenha";
import resetPassword from "./resetPassword";
import vendasPorDia from "./vendasPorDia";
import vendasPorSemana from "./vendasPorSemana";
import vendasPorMes from "./vendasPorMes";
import deletaProduto from "./deletaProduto";
import testaToken from "./testaToken";

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

//Rota para o Endpoint Consultar Vendas Por Horas do Dia:
app.use('/api', vendasPorDia);

//Rota para o Endpoint Consultar Vendas Por Dias na Semana:
app.use('/api', vendasPorSemana);

//Rota para o Endpoint Consultar Vendas Por Semanas no Mês:
app.use('/api', vendasPorMes);

//Rota para o Endpoint alterar perfil de usuário:
app.use('/api', alteraPerfilUsuario);

//Rota para o Endpoint de enviar E-mail para Reset de senha:
app.use('/api', emailResetaSenha);

//Rota para o Endpoint alterar a senha:
app.use('/api', resetPassword);

//Rota para o Endpoint de Deletar um Produto:
app.use('/api', deletaProduto);

//Rota para o Endpoint de Testar o Token:
app.use('/api', testaToken)


