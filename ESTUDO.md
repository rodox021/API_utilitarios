# Passo a Passo para Criar uma API Basica

## Dependencias basica


* **EXPRESS** => _essa depedencia é para rodar servidor e gerencias as requisições como GET POST E etc.._
* **NODEMON** => _restarta o servidor sempre que tiver mudança no codigo_
* **DOTENV** => _tarabalhar com variaveis de sistema no arquivo .env_
* **MONGOOSE** => _trabalhar com o banco de dados não relacional MongoDB_
* **CORS** => _para autorizar a solicitação de outros aplicativos_

**intalação com NPM**
```
npm i NOME_DA_DEPENDENCIA
 ```
---
 ## Pastas Basicas
Criar a pastar **_SRC_** que será a pasta rais da aplicação, dentro de SRC criar as seguintes pastas:

* **config** (vai servir para criar arquivos de configurações)
* **model** (para criar os arquivos de modelo do banco de dados )
* **api** (criar os arquivos com os funçoes como salvar, carregar e etc.)
* **service** (*OPCIONAL criar um arquivo de serviço da aplicação como um boor para start o servidor e bando de dados)
---


## Criar o Arquivo package.jason
`npm init -y`

---
## Criar o Arquivo Principal
Criar o arquivo principal da aplicação pode ser chamar main.js, index.js, app.js serve.js (o nome que quiser), normalmente e chada de um desses.

---
## Criar o Arquivo .ENV
Criar o arquivo .ENV **ATENÇÃO** o arquivo tem que ter nome com o '.'(ponto) na frente .env

**corpo do arquivo**
~~~
PORTA = 3000

MONGO_DB = mongodb+srv://utilitarios:050184@cluster0.xns7b.mongodb.net/<dbname>?retryWrites=true&w=majority
~~~


------

# Criando o Projeto

- Primeiro vamos criar o arquivo 

      **app.js** na rais do projeto que será o arquivo principal da aplicação, lembrando que o nome pode ser qualquer um.

- seguida vamos criar o arquivo **config.js** dentro da pasta src/config.

~~~JavaScript
const mongoose = require('mongoose') //importando o mongoose

module.exports ={
    app:{
        porta: process.env.porta || 3333 // setando a porta com a variavel do arquivo env
    },
    db:{
        connString: process.env.mongo_db // setando a porta com a variavel do arquivo env
    },
    mongoose // passando o mongoose que foi importado
}
~~~

- seguida vamos criar o arquivo **connMongoDB.js** dentro de uma pasta chamada BD (Banco de dados).
esse arquivo vai fazer a conxexão com o banco de dados.

~~~~JavaScript

require('dotenv') // importando para poder levar o arquivo env
const config = require('../config/index') // importando o arquivo de config criado anteriomente


const mongoose = config.mongoose // setando o mongoose do arquivo config
mongoose.set('useNewUrlParser', true) // para poder ler arquivo json fazendo um parser
mongoose.set('useCreateIndex', true)

module.exports  = () => {

    
    if(config.db.connString){ 
        mongoose.connect(config.db.connString, { // criando a conexão
        }).then(() => {
            console.log("Conexão com MongoDB realizada com sucesso!");
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
        });
    }else{
        console.log("Nenhuma string de conexão foi encontrada!");
    }
}
~~~~


- agora vamos preencer o nosso arquivo app.js e trabalhar com o express

~~~~JavaScript
// fazendo os importes
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connMongoDB = require('./src/db/connMongoDB') // arquivo de conexão



const app = express()
app.use(express.urlencoded({extended:true}))
app.use (express.json())


connMongoDB() // nosso arquivo de conexão


// liberando o acesso apra outro app.
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})


app.get('/', (req,res)=>{
    res.send("Funcionando metodo GET")
})



    


app.listen('3333', ()=>{
    console.log("BackEnd Rodando")
})

~~~~


### Com isso bastar rodar o comando `npm start app.js` e o servidor irá ser iniciado

````
[nodemon] starting `node app.js`
BackEnd Rodando
(node:10280) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Conexão com MongoDB realizada com sucesso!
````

---
---
---

# Criando a model do MongoDB

## Model Protocolo que irá gerar uma tebela com o nome de Protocolo com os campos descritos.

~~~~JavaScript
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
        timestamps: true // serve para adicinar o data do updade e gravação
    }
);

mongoose.model('protocolo', Protocolo) // exportando
~~~~

### criar a API com as funcionalidades do banco com o arquivo model

- dentro da pasta src/api criar o arquivo protocolo.js (pode ser usado outros nomes)

~~~~JavaScript
require('../model/Protocolo') // importando o arquivo model criado

const mongoose = require('mongoose')
mensagem = {
    msgErro: "Erro ao cadastrar a rota: ",
    msgSucesso: "Rota cadastrada com sucesso!"
}
const Protocolo = mongoose.model('protocolo')

const protocolo = {
    // criando um busca no banco que vai retornar todos os arquivos
    carregar(req,res){
        
        Protocolo.find({}) // Protocolo é o arquivo que veio pelo importe do model criado
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
    // cadastrando no banco
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

module.exports = protocolo // exportando o arquivo
~~~~


### Importando no nosso arquivo APP.Js e criando o metodo GET e POST

~~~~JavaScript
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connMongoDB = require('./src/db/connMongoDB')

const protocolo = require('./src/api/Protocolo') // importando o arquivo da API

const app = express()
app.use(express.urlencoded({extended:true}))
app.use (express.json())


connMongoDB() 



app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})


//************************* 
app.get('/carregar', protocolo.carregar) 
app.post('/cadastro', protocolo.cadastrar)

//***************************

    


app.listen('3333', ()=>{
    console.log("BackEnd Rodando")
})

~~~~


---
### Agora já temos a nossa primeira API cadastrando e retorando os dados