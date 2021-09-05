<?php

namespace App\Services;

use App\Classes\Util;
use App\Models\Exposicao;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ExposicoesService {

    protected function exposicaoValidator($data)
    {
        $validator = Validator::make($data, [
            'titulo' => 'required',
            'data_inicio' => 'required',
            'data_fim' => 'required',
            'curador' => 'required'
        ],[
            'titulo.required' => 'Titulo da exposicao nao informado',
            'data_inicio.required' => 'Data de inicio da exposicao nao informada',
            'data_fim.required' => 'Data final da exposicao nao informada',
            'curador.required' => 'Curador nao informado'
        ]);

        return $validator;
    }

    private function getExposicaoPorEdital($id_edital){

        $query = DB::table('exposicoes')
                    ->select('exposicoes.*')
                    ->where('exposicoes.edital', '=', $id_edital);
        return $query->get();
    }

    public function criarExposicao($data, $id_edital){

        $exposicao = $this->getExposicaoPorEdital($id_edital);

        if ($exposicao){
            return [
                'success' => 0,
                'message' => 'Já existe uma exposição cadastrada para este edital'
            ];
        } else {

            $validator = $this->exposicaoValidator($data);

            if($validator->fails()){
                return [
                    'success' => 0,
                    'message' => $validator->errors()->first()
                ];
            } else if (!$data['trabalhos']){
                return [
                    'success' => 0,
                    'message' => 'Nenhum trabalho foi selecionado para esta exposicao'
                ];
            } else {
                $exposicao = new Exposicao();
                $trabalhos = $data['trabalhos'];

                $exposicao->id = Util::newGUID();
                $exposicao->edital = $id_edital;
                $exposicao->fill($data);

                DB::beginTransaction();

                try{
                    $exposicao->save();
                    $query = DB::table('trabalhosexposicoes')
                                ->insert()

                }catch(Exception $e){

                }
            }
        }

        

    }
    
}
