const app = require('../../app')
const config = require('../config/index')


module.exports = (err) =>{

    if (err){
        return console.log("Erro ao se conectar no banco de dados! "+err)
    }
    app.listen(config.app.porta, (err)=>{
        if(err){
            return console.log('Erro: ' + err)
        }
    })

    console.log(`Servido sendo executado em  http://localhost: ${config.app.porta}`)

}