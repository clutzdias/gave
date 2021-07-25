<?php

namespace App\Models;

class Selecionador extends Usuario
{

    public function formacao()
    {
        return $this->hasOne(Formacao::class);
    }

}