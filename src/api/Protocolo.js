require('../model/Protocolo')
const mongoose = require('mongoose')
mensagem = {
    msgErro: "Erro ao cadastrar a rota: ",
    msgSucesso: "Rota cadastrada com sucesso!"
}
const Protocolo = mongoose.model('protocolo')

const protocolo = {
    
    async carregar(req,res){
        
        await Protocolo.find({})
            .then((protocolo) => {
                return res.json(protocolo)
            })
            .catch((erro) => {
                return res.status(400).json({
                    erro:true,
                    msg:mensagem.msgErro
                })
            })

    },
    carregarPorNome(req, res){
        Protocolo.find({ nomePaciente: {$regex:req.params.nome || " ent"}})
            .then((prot)=>{
                return res.status(200).json(prot)
            })
            .catch((erro)=>{
                return res.status(400).json({
                    error:true,
                    msg: "Nenhum protocolo foi encontraro com esse Nome: " + erro
                })
            })
    },
    carregarPorid(req, res){
        Protocolo.findOne({_id: req.params.id})
            .then((prot)=>{
                return res.status(200).json(prot)
            })
            .catch((erro)=>{
                return res.status(400).json({
                    error:true,
                    msg: "Nenhum protocolo foi encontraro com esse ID: " + erro
                })
            })
    },
    carregarPorExame(req, res){
        Protocolo.find({numeroExame:req.params.num})
            .then((prot)=>{
                return res.status(200).json(prot)
            })
            .catch((erro)=>{
                return res.status(400).json({
                    error:true,
                    msg: "Nenhum protocolo foi encontraro com esse ID: " + erro
                })
            })
    },
    carregarPorData(req, res){
        Protocolo.find({data:{$gte: req.query.di}}).and({data:{$lte: req.query.df}})
            .then((prot)=>{
                return res.status(200).json(prot)
            })
            .catch((erro)=>{
                return res.status(400).json({
                    error:true,
                    msg: "Nenhum protocolo foi encontraro com esse ID: " + erro
                })
            })
    },
    cadastrar(req, res){
        const prot = Protocolo.create(req.body,(err=>{
            if (err) return res.status(400).json({
                erro:true,
                msg: "Protocolo cadastro não afetuado!" + err
            })
            return res.status(200).json({
                erro:false,
                msg:"Cadastro Efetuado!",
                
                
            })
        }))
    },
    atualizar(req, res){
        const prot = Protocolo.updateOne({ _id: req.params.id}, req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Protocolo não foi editado com sucesso!"
            });
    
            return res.json({
                error: false,
                message: "Protocolo editado com sucesso!"
            });
        })
    },
    deletar(req, res){
        const prot = Protocolo.deleteOne({_id: req.params.id}, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Procoloco não foi apagado com sucesso!"
            });
    
            return res.json({
                error: false,
                message: "Protocolo apagado com sucesso!"
            });
        })
    }
}

module.exports = protocolo