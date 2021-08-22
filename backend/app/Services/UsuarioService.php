<?php

namespace App\Services;

use App\Classes\Util;
use App\Models\Formacao;
use App\Models\PerfilUsuario;
use App\Models\Usuario;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioService{

    public function criarUsuario($data): Usuario {
        
        $dados = [
            'id' => null,
            'cpf' => null,
            'nome' => null,
            'email' => null,
            'password' => null,
            'perfil' => null,
            'idade' => null,
            'genero' => null,
            'cidade' => null,
            'estado' => null
        ];

        $dados['id'] = Util::newGUID();

        if(\array_key_exists('cpf', $data)){
            $dados['cpf'] = $data['cpf'];
        }

        if(\array_key_exists('nome', $data)){
            $dados['nome'] = $data['nome'];
        }

        if(\array_key_exists('email', $data)){
            $dados['email'] = $data['email'];
        }

        if(\array_key_exists('password', $data)){
            $dados['password'] = Hash::make($data['password']);
        }

        if(\array_key_exists('perfil', $data)){
            $dados['perfil'] = $data['perfil'];
        }else{
            $dados['perfil'] = PerfilUsuario::SIMPLES;
        }

        if(\array_key_exists('idade', $data)){
            $dados['idade'] = $data['idade'];
        }

        if(\array_key_exists('genero', $data)){
            $dados['genero'] = $data['genero'];
        }

        if(\array_key_exists('cidade', $data)){
            $dados['cidade'] = $data['cidade'];
        }

        if(\array_key_exists('estado', $data)){
            $dados['estado'] = $data['estado'];
        }

        $usuario = Usuario::create($data);
            
        return $usuario;

    }

    public function validaDadosUsuario($dados){
        $msg = '';

        if((!\array_key_exists('cpf', $dados)) || ($dados['cpf'] === '')){
            $msg = 'O CPF é obrigatório';
        }

        if((!\array_key_exists('nome', $dados)) || ($dados['nome'] === '')){
            $msg = 'O nome é obrigatório';
        }

        if((!\array_key_exists('email', $dados)) || ($dados['email'] === '')){
            $msg = 'O email é obrigatório';
        }

        return $msg;

    }

    public function perfilUsuarioValido($perfil, Formacao $formacao){
        
        if ($perfil == PerfilUsuario::SELECIONADOR){

            if($formacao == null){
                return false;
            }
            /**Necessário incluir validação do tipo de curso,
             * mas isso depende de como iremos implementar no frontend
             */
        }

        return true;
    }


}