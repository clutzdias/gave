<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topico extends Model{

    public $timestamps = false;
    protected $fillable = [
        'id',
        'data_criacao',
        'usuario_criador'
    ];

    public function mensagens(){
        return $this->hasMany(Mensagem::class);
    }
    
}