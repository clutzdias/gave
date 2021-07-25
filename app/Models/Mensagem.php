<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensagem extends Model{

    public $timestamps = false;
    protected $fillable = [
        'id',
        'conteudo',
        'usuario_criador',
        'topico',
        'data'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function topico()
    {
        return $this->belongsTo(Topico::class);
    }

}