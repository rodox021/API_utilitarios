require('../model/Protocolo')
const mongoose = require('mongoose')
mensagem = {
    msgErro: "Erro ao cadastrar a rota: ",
    msgSucesso: "Rota cadastrada com sucesso!"
}
const Protocolo = mongoose.model('protocolo')

const protocolo = {
    
    carregar(req,res){
        
        Protocolo.find({})
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
    cadastrar(req, res){
        const prot = Protocolo.create(req.body,(err=>{
            if (err) return res.status(400).json({
                erro:true,
                msg: "Cadastro não afetuado!"
            })
            return res.status(200).json({
                erro:false,
                msg:"Cadastro Efetuado!"
            })
        }))
    }
}

module.exports = protocolo