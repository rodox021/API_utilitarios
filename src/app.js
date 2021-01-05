require('dotenv').config()
const express = require('express')
const cors = require('cors')

const protocolo = require('./api/Protocolo')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use (express.json())

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

    





module.exports = app

