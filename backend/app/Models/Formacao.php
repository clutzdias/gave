<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formacao extends Model{

    public $timestamps = false;
    protected $fillable = [
        'id',
        'instituicao',
        'curso',
        'situacao',
        'semestres_cursados'
    ];

    public function selecionador(){

        return $this->belongsTo(Selecionador::class);
    }

}