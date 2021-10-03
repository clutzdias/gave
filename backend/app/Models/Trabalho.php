<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trabalho extends Model{

    public $timestamps = false;
    protected $fillable = [
        'id',
        'conteudo',
        'artista',
        'titulo',
        'tecnica',
        'ano',
        'resumo',
        'edital'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }
}
