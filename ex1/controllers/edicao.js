var Edicao = require("../models/edicao")

// Lista todas as edições
module.exports.list = () => {
  return Edicao.find({}, { id: 1, ano_edicao: 1, organizacao: 1, vencedor: 1 }).sort({ ano_edicao: 1 }).exec()
}

// Obter uma edição por ID
module.exports.getEdicao = (id) => {
  return Edicao.findOne({ id: id }).exec()
}

// Listar edições por organizador
module.exports.getEdicoesByOrg = (org) => {
  return Edicao.find({ organizacao: org }, { id: 1, ano_edicao: 1, organizacao: 1, vencedor: 1 })
    .sort({ ano_edicao: 1 })
    .exec()
}

// Listar países organizadores
module.exports.getPaisesOrganizadores = () => {
  return Edicao.aggregate([
    { $group: { _id: "$organizacao", anos: { $push: "$ano_edicao" } } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, pais: "$_id", anos: 1 } },
  ]).exec()
}

// Listar países vencedores
module.exports.getPaisesVencedores = () => {
  return Edicao.aggregate([
    { $match: { vencedor: { $ne: null } } },
    { $group: { _id: "$vencedor", anos: { $push: "$ano_edicao" } } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, pais: "$_id", anos: 1 } },
  ]).exec()
}

// Listar intérpretes
module.exports.getInterpretes = () => {
  return Edicao.aggregate([
    { $unwind: "$musicas" },
    {
      $group: {
        _id: "$musicas.interprete",
        paises: { $addToSet: "$musicas.pais" },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, nome: "$_id", paises: 1 } },
  ]).exec()
}

// Adicionar uma nova edição
module.exports.addEdicao = (edicao) => {
  return Edicao.create(edicao)
}

// Atualizar uma edição
module.exports.updateEdicao = (id, edicao) => {
  return Edicao.findOneAndUpdate({ id: id }, edicao, { new: true }).exec()
}

// Remover uma edição
module.exports.deleteEdicao = (id) => {
  return Edicao.findOneAndDelete({ id: id }).exec()
}
