const Sequelize = require('sequelize');

const sequelize = new Sequelize('curso_node_mysql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("Conexão com o bando de dados realizada com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
});

module.exports = sequelize;