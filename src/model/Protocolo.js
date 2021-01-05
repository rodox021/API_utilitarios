const mongoose = require('mongoose')

const Protocolo = new mongoose.Schema(
    {
        data: {type: Date,required: true},
        patologista: {type: String,required: true},
        numeroExame: {type: String,required: true},
        nomePaciente: {type: String,required: true},
        solicitante: {type: String, required: true },
        contato: {
            nome: {
                type: String,
                required: true
            },
            tel: {type: String}

        },
        medico: {type: String,required: true},
        motivo: {type: String,required: false},
        lam: {type: Boolean,required: false},
        bloco: {type: Boolean, required: false},
        obs: { type: String,required: false},
        atendente: {type: String,required: false},
    },
    {
        timestamps: true
    }
);

mongoose.model('protocolo', Protocolo)