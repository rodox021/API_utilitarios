require('dotenv').config()
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


app.get('/', (req,res)=>{
    res.send("Funcionando metodo GET")
})

app.get('/carregar', protocolo.carregar)
app.post('/cadastro', protocolo.cadastrar)

    


app.listen('3333', ()=>{
    console.log("BackEnd Rodando")
})







