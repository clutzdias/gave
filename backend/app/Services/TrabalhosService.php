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
            'titulo' => 'required',
            'tecnica' => 'required',
            'ano' => 'required'
        ],[
            'titulo.required' => 'Titulo do trabalho nao informado',
            'tecnica.required' => 'Tecnica do trabalho nao informada',
            'ano.required' => 'Ano do trabalho nao informado'
        ]);

        return $validator;
    }

    public function criarTrabalho($data, $path)
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
            $trabalho->conteudo = $path;
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

    public function atualizarTrabalho($data, $id_trabalho, $path){

        $trabalho = Trabalho::find($id_trabalho);

        if(!$trabalho){
            return [
                'success' => 0,
                'message' => 'Trabalho nao encontrado'
            ];
        }

        $trabalho->fill($data);

        if ($path != ''){
            $trabalho->conteudo = $path;
        }

        $trabalho->save();

        return [
            'success' => 1,
            'message' => 'Trabalho atualizado com sucesso'
        ];
        
        

    }

    public function excluirTrabalho($id_usuario, $id_trabalho){

        $trabalho = Trabalho::find($id_trabalho);

        if (!$trabalho){
            return [
                'success' => 0,
                'message' => 'Trabalho nao encontrado'
            ];
        } else {
            if ($trabalho->artista != $id_usuario){
                return [
                    'success' => 0,
                    'message' => 'Este trabalho nao pertence ao usuario informado'
                ];
            } else {
                $trabalho->delete();
                return [
                    'success' => 1,
                    'message' => 'Trabalho excluído com sucesso'
                ];
            }

        }

    }

}
