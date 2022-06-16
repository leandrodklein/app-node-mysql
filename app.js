const express = require("express");
var cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { eAdmin } = require('./middlewares/auth');
const User = require('./models/User');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

// Listar
app.get("/users", eAdmin, async (req, res) => {

    await User.findAll({ 
        attributes: [ 'id', 'name', 'email', 'password' ],
        order: [[ 'id', 'DESC' ]]})
    .then((users) => {
        return res.json({
            erro:false,
            users
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Nenhum usuário encontrado!"      
        });        
    })    
});

// Visualizar
app.get("/user/:id", eAdmin, async (req, res) => {
    const { id } = req.params

    // await Usuario.findOne({ where: { id: id } })
    await User.findByPk(id)
    .then((user) => {
        return res.json({
            erro:false,
            user: user
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Nenhum usuário encontrado!"      
        }); 
    });    
});

// Cadastrar
app.post("/user", eAdmin, async (req, res) => {
    var dados = req.body;

    // 8 significa a força da senha
    dados.password = await bcrypt.hash(dados.password, 8);

    await User.create(dados)
    .then(() => {
        return res.json({
            erro: false, 
            mensagem: "Usuario cadastrado com sucesso!"      
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Usuario não cadastrado com sucesso!"      
        });        
    });    
});

// Editar as informações
app.put("/user", eAdmin, async (req, res) => {
    const { id } = req.body

    await User.update(req.body, { where: { id }})
    .then(() => {
        return res.json({
            erro: false, 
            mensagem: "Usuario editado com sucesso!"      
        }); 
    }).catch(() => {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Usuario não editado com sucesso!"      
        }); 
    });   
});

// Editar a senha
app.put("/user-senha", eAdmin, async (req, res) => {
    const { id, password } = req.body

    var senhaCrypt = await bcrypt.hash(password, 8);

    // A coluna password recebe a senha criptograda
    await User.update({ password: senhaCrypt }, { where: { id }})
    .then(() => {
        return res.json({
            erro: false, 
            mensagem: "Senha editada com sucesso!"      
        }); 
    }).catch(() => {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Senha não editada com sucesso!"      
        }); 
    });   
});

// Deletar
app.delete("/usuario/:id", eAdmin, async (req, res) => {
    const { id } = req.params
    
    await User.destroy({ where: {id}})
    .then(() => {
        return res.json({
            erro: false, 
            mensagem: "Usuario excluído com sucesso!"      
        }); 
    }).catch(() => {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Usuario não excluído com sucesso!"      
        }); 
    });   
});

app.post("/login", async (req, res) => {
    const user = await User.findOne({ 
        attributes: [ 'id', 'name', 'email', 'password' ], 
        where: { 
            email: req.body.email 
        } 
    });

    if(user === null) {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Usuário ou a senha incorreto!"      
        });  
    };

    if(!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Usuário ou a senha incorreto!"      
        }); 
    };

    // 'tokenkey' - pode informar qualquer chave -> exclusiva
    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
        // expiresIn: 600 // 10min
        expiresIn: '7d' // 7 dias
    });

    return res.json({
        erro: false, 
        mensagem: "Login realizado com sucesso!",
        token    
    }); 
});

app.get("/val-token", eAdmin, async (req, res) => {
    await User.findByPk(req.userId, {attributes: ['id', 'name', 'email']})
    .then((user) => {
        return res.json({
            erro: false, 
            user 
        }); 
    }).catch(() => {
        return res.status(400).json({
            erro: true, 
            mensagem: "Erro: Necessário realizar o login para acessar a página!"      
        }); 
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});