**GAVE - Galeria de Artes Virtual Estudantil**

Este projeto busca oferecer uma opção virtual de galeria de artes visuais, acessível a qualquer estudante de arte e também ao público em geral, disponibilizando conteúdo e um ambiente de debate sobre conceitos relacionados às artes como um todo.

**Pré-requisitos para levantar o projeto:**

- Instalação prévia do PHP 7.3

- Instalação prévia do Composer

- Instalação prévia do PostgreSQL

- Clonar o repositório através do comando: git clone

- Com o PostgreSQL instalado, criar um novo database com o nome gave. 

**Na pasta raíz do projeto:**

Rodar o comando: composer install

Criar uma cópia do arquivo .env.example, dar o nome de .env, e editar as informações do banco de dados conforme trecho abaixo, substituindo o PORT, o USERNAME e PASSWORD conforme a configuração da sua máquina:

![config_env](https://github.com/clutzdias/gave/blob/master/imagens/config_env.png)

Editar o arquivo database.php, fazendo as substituições de 'port', 'username' e 'password' conforme as configurações da sua máquina:

![config_database](https://github.com/clutzdias/gave/blob/master/imagens/config_database.png)

Após o término da instalação, rodar as migrations: php artisan migrate

Para subir o servidor, rodar o comando: php artisan serve

Acessar o projeto através do endereço: http://localhost:8000
