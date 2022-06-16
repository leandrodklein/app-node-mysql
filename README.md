Criar o arquivo package
### npm init

Gerencia as requisições, rotas e URLs...
### npm install express

Rodar o projeto
### node app.js

Acessar o projeto no navegador
### http://localhost:8080

Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte
### npm install -g nodemon

Verificar o banco de dados MySQL no pront de comando
### mysql -h localhost -u root -p

Criar a base de dados no Workbench
### create database curso_node_mysql character set utf8mb4 collate utf8mb4_unicode_ci;

Criar a tabela user
### create table `user`(
###	`id` int not null auto_increment,
###	`name` varchar(220) collate utf8mb4_unicode_ci default null,
### `email`varchar(220) collate utf8mb4_unicode_ci default null,
###    primary key (`id`)
### ) engine=InnoDB default charset=utf8mb4 collate utf8mb4_unicode_ci;

Inserir dados na tabela user
### insert into user(name, email) values ('Teste', 'teste@teste.com');

Sequelize é uma biblioteca Javascript que facilita o gerenciamento do banco de dados SQL
### npm install --save sequelize

Instalar o drive do banco de dados
### npm install --save mysql2

Instalar o módulo para criptografar a senha
### npm install --save bcryptjs

Instalar a dependencia para JWT (token)
### npm install --save jsonwebtoken

Gerenciar variáveis de ambiente
### npm install --save dotenv

Permitir acesso a API
### npm install --save cors
