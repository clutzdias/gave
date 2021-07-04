**GAVE - Galeria de Artes Virtual Estudantil

Este projeto busca oferecer uma opção virtual de galeria de artes visuais, acessível a qualquer estudante de arte e também ao público em geral, disponibilizando conteúdo e um ambiente de debate sobre conceitos relacionados às artes como um todo.

**Pré-requisitos para levantar o projeto:

- Instalação prévia do PHP 7.3

- Instalação prévia do Composer

- Instalação prévia do PostgreSQL

- Clonar o repositório através do comando: git clone

**Na pasta raíz do projeto:

- rodar o comando: composer install

- criar uma cópia do arquivo .env.example, dar o nome de .env, e editar as informações do banco de dados conforme trecho abaixo, substituindo o PORT, o USERNAME e PASSWORD conforme a configuração da sua máquina:

-DB_CONNECTION=pgsql
-DB_HOST=127.0.0.1
-DB_PORT=3306
-DB_DATABASE=gave
-DB_USERNAME=seuusuario
-DB_PASSWORD=suasenha

- Após o término da instalação, rodar as migrations:

- Para subir o servidor, rodar o comando: php artisan serve

- Acessar o projeto através do endereço: http://localhost:8000
