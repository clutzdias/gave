<?php

namespace App\Services;

use App\Classes\Util;
use App\Models\Exposicao;
use App\Models\Trabalho;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use phpDocumentor\Reflection\PseudoTypes\True_;

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
                    ->select('exposicoes.id')
                    ->where('exposicoes.edital', '=', $id_edital);
        return $query->get();
    }

    public function criarExposicao($data, $id_edital){

        $edital = $data['edital'];

        $exposicao = $this->getExposicaoPorEdital($edital);

        if (count($exposicao) > 0){
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
                $id_exposicao = Util::newGUID();

                $exposicao = new Exposicao();
                $trabalhos = $data['trabalhos'];

                $exposicao->edital = $edital;
                $exposicao->fill($data);

                DB::beginTransaction();

                try{
                    DB::table('exposicoes')
                        ->insert(['id' => $id_exposicao,
                                'titulo' => $exposicao->titulo,
                                'data_inicio' => $exposicao->data_inicio,
                                'data_fim' => $exposicao->data_fim,
                                'edital' => $edital,
                                'curador' => $exposicao->curador]);

                    foreach($trabalhos as $trabalho_id){
                        $trabalho = Trabalho::find($trabalho_id);
                        $id = Util::newGUID();

                        if($trabalho){
                            DB::table('trabalhosexposicoes')
                                ->insert(['id' => $id,
                                    'exposicao' => $id_exposicao,
                                    'trabalho' => $trabalho_id,
                                    'artista' => $trabalho->artista]);
                        }else {
                            return [
                                'success' => 0,
                                'message' => 'Trabalho nao cadastrado.'
                            ];

                        }     
                    } 

                    DB::commit();

                    return [
                        'success' => 1,
                        'message' => 'Exposicao criada com sucesso'
                    ];
                    

                }catch(Exception $e){
                    DB::rollBack();
                     return [
                        'success' => 2,
                        'message' => 'Falha ao gravar exposicao'
                    ]; 

                }
            }
        }
    }

    public function getExposicoes(){

        $data = new DateTime('now');

        return DB::table('exposicoes')
                ->select('*')
                ->where('data_fim', '>=', $data)
                ->where('data_inicio', '<=', $data)
                ->get();

    }

    private function criaAssocArrayExposicao($record){

        $exposicao = array(
            'id' => null,
            'titulo' => null,
            'data_inicio' => null,
            'data_fim' => null,
            'curador' => null
        );

        if(!\is_array($record)){
            return $exposicao;
        }

        if(\array_key_exists('id', $record)){
            $exposicao['id'] = $record['id'];
        }

        if(\array_key_exists('titulo', $record)){
            $exposicao['titulo'] = $record['titulo'];
        }

        if(\array_key_exists('data_inicio', $record)){
            $exposicao['data_inicio'] = $record['data_inicio'];
        }

        if(\array_key_exists('data_fim', $record)){
            $exposicao['data_fim'] = $record['data_fim'];
        }

        if(\array_key_exists('curador', $record)){
            $curador = $this->getNomeCurador($record['curador']);
            $exposicao['curador'] = $curador;
        }

        return $exposicao;

    }

    private function criaAssocArrayTrabalho($record){

        $trabalho = array(
            'titulo' => null,
            'conteudo' => null,
            'tecnica' => null,
            'ano' => null,
            'resumo' => null,
            'artista' => null
        );

        if(!\is_array($record)){
            return $trabalho;
        }

        if(\array_key_exists('titulo', $record)){
            $trabalho['titulo'] = $record['titulo'];
        }

        if(\array_key_exists('conteudo', $record)){
            $trabalho['conteudo'] = $record['conteudo'];
        }

        if(\array_key_exists('tecnica', $record)){
            $trabalho['tecnica'] = $record['tecnica'];
        }

        if(\array_key_exists('ano', $record)){
            $trabalho['ano'] = $record['ano'];
        }

        if(\array_key_exists('resumo', $record)){
            $trabalho['resumo'] = $record['resumo'];
        }

        if(\array_key_exists('artista', $record)){
            $trabalho['artista'] = $record['artista'];
        }

        return $trabalho;

    }

    private function getNomeCurador($id_curador){
        return DB::table('usuarios')
                ->select('nome')
                ->where('usuarios.id', '=', $id_curador)
                ->get();

    }

    public function getExposicaoComTrabalhos($id_exposicao){

        $query = DB::table('exposicoes')
                    ->join('trabalhosexposicoes', 'exposicoes.id', '=', 'trabalhosexposicoes.exposicao')
                    ->join('trabalhos', 'trabalhos.id', '=', 'trabalhosexposicoes.trabalho')
                    ->join('usuarios', 'usuarios.id', '=', 'trabalhosexposicoes.artista')
                    ->select('exposicoes.id',
                            'exposicoes.edital',
                            'exposicoes.titulo',
                            'exposicoes.data_inicio',
                            'exposicoes.data_fim',
                            'exposicoes.curador',
                            'trabalhos.id',
                            'trabalhos.conteudo',
                            'trabalhos.titulo',
                            'trabalhos.tecnica',
                            'trabalhos.ano',
                            'trabalhos.resumo',
                            'usuarios.nome')
                    ->where('exposicoes.id', '=', $id_exposicao);
        
        $exposicaoRecords = $query->get();
        
        /* @var $exposicao array */
        $exposicao = null;

        foreach($exposicaoRecords as $record){
            if ($exposicao === null){
                $exposicao = $this->criaAssocArrayExposicao($record);
            }

            if(!\array_key_exists('trabalhos', $exposicao)){
                $exposicao['trabalhos'] = array();
            }

            $exposicao['trabalhos'][] = $this->criaAssocArrayTrabalho($record);
        }

        return $exposicao;


    }

    public function alterarExposicao($data, $id_exposicao){

        $exposicao = Exposicao::find($id_exposicao);

        if (!$exposicao){
            return [
                'success' => 0,
                'message' => 'Exposicao nao encontrada'
            ];
        }

        $exposicao->fill($data);

        DB::beginTransaction();
        
        try{
        
            if($data['trabalhos']){
                
                $exposicao->save();

                DB::delete('delete from trabalhosexposicoes where exposicao = ?', [$id_exposicao]);

                foreach($data['trabalhos'] as $trabalho){
                    DB::table('trabalhosexposicoes')
                    ->insert(['exposicao' => $exposicao->id,
                            'trabalho' => $trabalho->id,
                            'artista' => $trabalho->artista]);
                }

                DB::commit();

                return [
                    'success' => 1,
                    'message' => 'Exposicao e trabalhos alterados com sucesso'
                ];

            }else{
                $exposicao->save();
                DB::commit();

                return [
                    'success' => 1,
                    'message' => 'Exposicao alterada com sucesso'
                ];

            }
        }catch(Exception $e){
            DB::rollBack();
            return [
                'success' => 2,
                'message' => 'Falha ao salvar alteracoes na exposicao'
            ];

        }
    }

    
}
