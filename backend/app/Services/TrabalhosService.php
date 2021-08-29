<?php

namespace App\Services;

use App\Models\Trabalho;
use App\Classes\Util;
use Illuminate\Support\Facades\DB;
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

    public function getTrabalhosPorEdital($id_edital, $id_usuario = '')
    {
        $query = DB::table('trabalhos')
                        ->join('usuarios', 'trabalhos.artista', '=', 'usuarios.id')
                        ->select('trabalhos.id',
                                'trabalhos.conteudo',
                                'trabalhos.titulo',
                                'trabalhos.tecnica',
                                'trabalhos.ano',
                                'trabalhos.resumo', 
                                'usuarios.nome')
                        ->where('trabalhos.edital', '=', $id_edital);
        
        if($id_usuario != ''){
            $query->where('trabalhos.artista', '=', $id_usuario);
        }     
        
        return $query->get();

    }

    public function atualizarTrabalho($data, $id_trabalho){

        $trabalho = Trabalho::find($id_trabalho);

        if(!$trabalho){
            return [
                'success' => 0,
                'message' => 'Trabalho nao encontrado'
            ];
        }
        
        $validator = $this->trabalhoValidator($data);

        if($validator->fails()){
            return [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {

            $trabalho->fill($data);
            $trabalho->save();

            return [
                'success' => 1,
                'message' => 'Trabalho atualizado com sucesso'
            ];
        
        }

    }

}
