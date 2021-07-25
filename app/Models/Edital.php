<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Edital extends Model{

    public $timestamps = false;
    protected $fillable = [
        'id',
        'titulo',
        'descricao',
        'exigencias',
        'data_inicio',
        'data_fim',
        'vigente',
        'quantidade_obras'
    ];

    public function exposicao(){
        return $this->hasOne(Exposicao::class);
    }

    public function selecionadores(){
        return $this->hasMany(Usuario::class);
    }
}