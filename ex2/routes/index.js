var express = require("express")
var router = express.Router()
var axios = require("axios")

/* GET home page. */
router.get("/", (req, res) => {
  axios
    .get("http://localhost:25000/edicoes")
    .then((resp) => {
      data = resp.data
      res.status(200)
      res.render("index", { title: "Festival Eurovisão", edicoes: data })
    })
    .catch((erro) => {
      console.log(erro)
      res.render("error", { message: "Erro ao obter edições", error: erro })
    })
})

router.get("/:id", (req, res) => {
  var id = req.params.id
  axios
    .get("http://localhost:25000/edicoes/" + id)
    .then((resp) => {
      data = resp.data
      res.status(200)
      res.render("edicao", { title: `Edição ${data.ano_edicao}`, edicao: data })
    })
    .catch((erro) => {
      console.log(erro)
      res.render("error", { message: "Erro ao obter edição", error: erro })
    })
})

router.get("/paises/:pais", (req, res, next) => {
  var pais = req.params.pais

  // Buscar dados do país através de múltiplas chamadas à API
  Promise.all([
    axios.get("http://localhost:25000/edicoes"), // Todas as edições
  ])
    .then((responses) => {
      const todasEdicoes = responses[0].data // Todas as edições

      // Processar participações do país
      const participacoes = []
      const organizadas = []

      // Filtrar edições organizadas pelo país
      todasEdicoes.forEach((edicao) => {
        if (edicao.organizacao === pais) {
          organizadas.push({
            id: edicao.id,
            ano: edicao.ano_edicao,
          })
        }
      })

      // Buscar participações em cada edição
      const promisesParticipacoes = todasEdicoes.map((edicao) => {
        return axios
          .get(`http://localhost:25000/edicoes/${edicao.id}`)
          .then((resp) => {
            const edicaoCompleta = resp.data
            if (edicaoCompleta && edicaoCompleta.musicas) {
              const musicaPais = edicaoCompleta.musicas.find((m) => m.pais === pais)
              if (musicaPais) {
                participacoes.push({
                  id: edicaoCompleta.id,
                  ano: edicaoCompleta.ano_edicao,
                  musica: musicaPais.titulo,
                  interprete: musicaPais.interprete,
                  venceu: edicaoCompleta.vencedor === pais,
                })
              }
            }
          })
          .catch((err) => {
            console.log(`Erro ao buscar edição ${edicao.id}:`, err.message)
          })
      })

      // Aguardar todas as buscas de participações
      Promise.all(promisesParticipacoes)
        .then(() => {
          const paisData = {
            nome: pais,
            participacoes: participacoes.sort((a, b) => a.ano - b.ano),
            organizadas: organizadas.sort((a, b) => a.ano - b.ano),
          }

          res.status(200)
          res.render("pais", {
            title: `País: ${pais}`,
            pais: paisData,
          })
        })
        .catch((erro) => {
          console.log("Erro ao processar participações:", erro)
          res.render("error", {
            message: "Erro ao obter informações do país",
            error: erro,
          })
        })
    })
    .catch((erro) => {
      console.log("Erro ao buscar dados do país:", erro)
      res.render("error", {
        message: "Erro ao obter informações do país",
        error: erro,
      })
    })
})

module.exports = router
