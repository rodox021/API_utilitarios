require('dotenv')
const app = require('./src/app')
const config = require('./src/config/index')
const boot = require('./src/service/boot')

const mongoose = config.mongoose
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)


if(config.db.connString){
    boot()
    mongoose.connect(config.db.connString, {
    }).then(() => {
        console.log("Conexão com MongoDB realizada com sucesso!");
    }).catch((erro) => {
        console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
    });
}else{
    console.log("Nenhuma string de conexão foi encontrada!");
}





