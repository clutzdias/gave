<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

abstract class PerfilUsuario{
    const SIMPLES = 0;
    const ARTISTA = 1;
    const SELECIONADOR = 2;
}

class Usuario extends Model{

    public $timestamps = false;
    protected $fillable = [
        'cpf',
        'nome',
        'email',
        'password',
        'perfil',
        'idade',
        'genero',
        'cidade',
        'estado'
    ];

    public function mensagens()
    {
        return $this->hasMany(Mensagem::class);
    }

    public function topicos()
    {
        return $this->hasMany(Topico::class);
    }

    public function formacao()
    {
        return $this->hasOne(Formacao::class);
    }

    public function trabalhos()
    {
        return $this->hasMany(Trabalho::class);
    }

}


