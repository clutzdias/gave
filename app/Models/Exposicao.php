<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Exposicao extends Model
{

    public $timestamps = false;
    protected $fillable = [
        'id',
        'edital',
        'titulo',
        'data_inicio',
        'data_fim',
        'exposicao_aberta',
        'curador'
    ];

    public function edital(){
        return $this->belongsTo(Edital::class);
    }

    public function trabalhos(){
        return $this->hasMany(Trabalho::class);
    }

    public function artistas(){
        return $this->hasMany(Artista::class);
    }

    public function selecionadores(){
        return $this->hasMany(Selecionador::class);
    }

    public function getCurador($edital){
        $query = DB::table('selecionadoreseditais')
                    ->select('selecionador')
                    ->where('edital', '=', $edital)
                    ->where('curador', '=', 'TRUE');
        return $query->get();
    }

}