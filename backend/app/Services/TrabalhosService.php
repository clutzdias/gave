<?php

namespace App\Services;

use App\Models\Trabalho;
use App\Classes\Util;
use Illuminate\Support\Facades\Validator;

class TrabalhosService {

    protected function trabalhoValidator($data)
    {
        $validator = Validator::make($data, [
            'conteudo' => 'required',
            'titulo' => 'required',
            'tecnica' => 'required',
            'ano' => 'required'
        ],[
            'conteudo.required' => 'Conteudo nao especificado',
            'titulo.required' => 'Titulo do trabalho nao informado',
            'tecnica.required' => 'Tecnica do trabalho nao informada',
            'ano.required' => 'Ano do trabalho nao informado'
        ]);

        return $validator;
    }

    public function criarTrabalho($data)
    {
        //var_dump($data);
        $validator = $this->trabalhoValidator($data);

        if($validator->fails()){
            return [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $trabalho = new Trabalho();
            $trabalho->id = Util::newGuid();
            $trabalho->fill($data);
            $trabalho->save();

            return [
                'success' => 1,
                'message' => 'Trabalho criado com sucesso'
            ];
        }
    }
}
