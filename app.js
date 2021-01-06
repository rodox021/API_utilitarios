require('dotenv').config()
const config = require('./src/config/index')
const express = require('express')
const cors = require('cors')
const connMongoDB = require('./src/db/connMongoDB')

const protocolo = require('./src/api/Protocolo')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use (express.json())



connMongoDB() // conecatando com o banco de dados



app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})

app.get('/', (req,res) =>{res.send("teste de get")})
app.get('/carregar/:id', protocolo.carregarPorid)
app.get('/carregarNome/:nome', protocolo.carregarPorNome)
app.get('/carregarExame/:num', protocolo.carregarPorExame)
app.get('/carregarData/', protocolo.carregarPorData)

app.get('/carregar', protocolo.carregar)
app.post('/cadastro', protocolo.cadastrar)
app.put('/cadastro/:id', protocolo.atualizar)
app.delete('/cadastro/:id', protocolo.deletar)

    


app.listen(config.app.porta, ()=>{
    console.log("BackEnd Rodando: " + config.app.porta)
})







