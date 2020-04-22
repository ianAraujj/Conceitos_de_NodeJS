const express = require('express');
const server = express();

// Estrutura de Dados Padrão
server.use(express.json());

// Middleware Global
server.use((req, res, next) => {
  quantidade_req ++;
  console.log(quantidade_req);
  return next();
})

// Middlewares
function verifica_projeto_valido(req, res, next) {

  if ((req.body.id) && (req.body.title)) {
    return next();
  } else {
    return res.status(400).json(
      { ERROR: "A requisição deve conter um 'id' e um 'title' " }
    );
  }

}

function verifica_id(req, res, next) {
  const id = req.params.id;

  if (percorre_projetos(id) != null) {
    return next();
  } else {
    return res.status(400).json({
      ERROR: "ID não encontrado"
    })
  }
}

function verifica_campo_title(req, res, next) {
  if (req.body.title) {
    return next();
  } else {
    return res.status(400).json(
      { ERROR: "A requisição deve conter um 'title' " }
    );
  }
}

//Funcções auxiliares

function percorre_projetos(id) {
  for (var i = 0; i < projetos.length; i++) {
    if (projetos[i].id == id) {
      return i;
    }
  }

  return null;
}

// Dados
var quantidade_req = 0;
const projetos = [
  { id: "1", title: "Projeto 1", tasks: ['Tarefa 1', 'Tarefa 2'] },
]

// ROTAS
server.post('/projects', verifica_projeto_valido, (req, res) => {

  projetos.push({
    id: req.body.id,
    title: req.body.title,
    tasks: []
  })

  return res.status(200).json({
    MESSAGE: "Projeto cadastrado!!!"
  });

})

server.get('/projects', (req, res) => {
  return res.json(projetos);
})

server.put('/projects/:id', verifica_campo_title, verifica_id, (req, res) => {
  const id = req.params.id;

  var indice = percorre_projetos(id);

  projetos[indice].title = req.body.title;

  return res.status(200).json({
    MESSAGE: "Projeto alterado!!!"
  });

})

server.delete('/projects/:id', verifica_id, (req, res) => {
  const id = req.params.id;
  const indice = percorre_projetos(id);
  projetos.splice(indice, 1);

  return res.status(200).json({
    MESSAGE: "Projeto deletado!!"
  });

})

server.post('/projects/:id/tasks', verifica_id, verifica_campo_title, (req, res) => {
  const id = req.params.id;
  const indice = percorre_projetos(id);

  projetos[indice].tasks.push(req.body.title);

  return res.status(400).json({
    MESSAGE: "Tarefa Adicionada"
  })
})

// Definir porta padrão
server.listen(3000);