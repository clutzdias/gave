<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topico extends Model{

    public $timestamps = false;
    protected $fillable = [
        'id',
        'titulo',
        'data_criacao',
        'usuario_criador'
    
    ];

    public function mensagens()
    {
        return $this->hasMany(Mensagem::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
    
}
