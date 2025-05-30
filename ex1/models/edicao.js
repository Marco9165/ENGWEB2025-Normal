const mongoose = require("mongoose")

const musicaSchema = new mongoose.Schema({
  id: String,
  link: String,
  titulo: String,
  pais: String,
  compositor: String,
  interprete: String,
  letra: String,
})

const edicaoSchema = new mongoose.Schema({
  id: String,
  ano_edicao: String,
  organizacao: String,
  vencedor: String,
  musicas: [musicaSchema],
})

module.exports = mongoose.model("Edicao", edicaoSchema, "edicoes")
