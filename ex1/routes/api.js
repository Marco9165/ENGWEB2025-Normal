var express = require("express")
var router = express.Router()
var Edicao = require("../controllers/edicao")

// GET /edicoes - lista todas as edições
router.get("/edicoes", (req, res, next) => {
  if (req.query.org) {
    Edicao.getEdicoesByOrg(req.query.org)
      .then((data) => res.status(200).jsonp(data))
      .catch((erro) => res.status(500).jsonp(erro))
  } else {
    Edicao.list()
      .then((data) => res.status(200).jsonp(data))
      .catch((erro) => res.status(500).jsonp(erro))
  }
})

// GET /edicoes/:id - obtém uma edição específica
router.get("/edicoes/:id", (req, res, next) => {
  Edicao.getEdicao(req.params.id)
    .then((data) => res.status(200).jsonp(data))
    .catch((erro) => res.status(500).jsonp(erro))
})

// GET /paises?papel=org - lista países organizadores
// GET /paises?papel=venc - lista países vencedores
router.get("/paises", (req, res, next) => {
  if (req.query.papel === "org") {
    Edicao.getPaisesOrganizadores()
      .then((data) => res.status(200).jsonp(data))
      .catch((erro) => res.status(500).jsonp(erro))
  } else if (req.query.papel === "venc") {
    Edicao.getPaisesVencedores()
      .then((data) => res.status(200).jsonp(data))
      .catch((erro) => res.status(500).jsonp(erro))
  } else {
    res.status(400).jsonp({ erro: "Parâmetro 'papel' inválido. Use 'org' ou 'venc'." })
  }
})

// GET /interpretes - lista todos os intérpretes
router.get("/interpretes", (req, res, next) => {
  Edicao.getInterpretes()
    .then((data) => res.status(200).jsonp(data))
    .catch((erro) => res.status(500).jsonp(erro))
})

// POST /edicoes - adiciona uma nova edição
router.post("/edicoes", (req, res, next) => {
  Edicao.addEdicao(req.body)
    .then((data) => res.status(201).jsonp(data))
    .catch((erro) => res.status(500).jsonp(erro))
})

// PUT /edicoes/:id - atualiza uma edição
router.put("/edicoes/:id", (req, res, next) => {
  Edicao.updateEdicao(req.params.id, req.body)
    .then((data) => res.status(200).jsonp(data))
    .catch((erro) => res.status(500).jsonp(erro))
})

// DELETE /edicoes/:id - remove uma edição
router.delete("/edicoes/:id", (req, res, next) => {
  Edicao.deleteEdicao(req.params.id)
    .then((data) => res.status(200).jsonp(data))
    .catch((erro) => res.status(500).jsonp(erro))
})

module.exports = router
