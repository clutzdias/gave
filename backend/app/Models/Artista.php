<?php

namespace App\Models;

class Artista extends Usuario
{

    public function trabalhos()
    {
        return $this->hasMany(Trabalho::class);
    }
}