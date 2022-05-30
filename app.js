const express = require("express");
const User = require('./models/User');
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {

    await User.findAll({ 
        attributes: [ 'id', 'name', 'email' ],
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

app.get("/user/:id", async (req, res) => {
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

app.post("/user", async (req, res) => {
    const { name, email } = req.body;

    await User.create(req.body)
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

app.put("/user", async (req, res) => {
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

app.delete("/usuario/:id", async (req, res) => {
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

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});