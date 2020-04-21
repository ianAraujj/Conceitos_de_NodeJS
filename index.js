const express = require('express');
const server = express();

// Estrutura de Dados Padrão
server.use(express.json());

// Middleware Principal
server.use((req, res, next) =>{
  return next();
})

// Middlewares
function verifica_projetos_validos(req, res, next){

  if ((req.body.id) && (req.body.title)){
    return next();
  }else{
    return res.status(400).json(
      {ERROR: "A requisição deve conter um 'id' e um 'title' "}
    );
  }
}

// Dados
const projetos = [
  {id: "1", title: "Projeto 1", tasks: ['Tarefa 1', 'Tarefa 2']},
]

// ROTAS
server.post('/projects', verifica_projetos_validos, (req, res) =>{

  projetos.push({
    id: req.body.id,
    title: req.body.title
  })

  return res.status(200).json({
    MESSAGE: "Projeto cadastrado!!!"
  });

})

server.get('/projects', (req, res) =>{
  return res.json(projetos);
})

// Definir porta padrão
server.listen(3000);