require('dotenv')
const config = require('../config/index')


const mongoose = config.mongoose
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)

module.exports  = () => {

    
    if(config.db.connString){ 
        mongoose.connect(config.db.connString, {
        }).then(() => {
            console.log("Conexão com MongoDB realizada com sucesso!");
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
        });
    }else{
        console.log("Nenhuma string de conexão foi encontrada!");
    }
}





