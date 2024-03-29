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

    public function getExposicaoPorEdital($id_edital){
        
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
                'message' => 'Ja existe uma exposicao cadastrada para este edital'
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

        if($record->id_exposicao != ""){
            $exposicao['id'] = $record->id_exposicao;
        }

        if($record->tituloexposicao != ""){
            $exposicao['titulo'] = $record->tituloexposicao;
        }

        if($record->data_inicio != ""){
            $exposicao['data_inicio'] = $record->data_inicio;
        }

        if($record->data_fim != ""){
            $exposicao['data_fim'] = $record->data_fim;
        }

        if($record->curador != ""){
            $curador = $this->getNomeCurador($record->curador);
            $exposicao['curador'] = $curador[0]->nome;
        }

        return $exposicao;

    }

    private function criaAssocArrayTrabalho($record){

        $trabalho = array(
            'id' => null,
            'titulo' => null,
            'conteudo' => null,
            'tecnica' => null,
            'ano' => null,
            'resumo' => null,
            'artista' => null
        );

        if($record->id_trabalho != ""){
            $trabalho['id'] = $record->id_trabalho;
        }

        if($record->titulotrabalho != ""){
            $trabalho['titulo'] = $record->titulotrabalho;
        }

        if($record->conteudo != ""){
            $trabalho['conteudo'] = $record->conteudo;
        }

        if($record->tecnica != ""){
            $trabalho['tecnica'] = $record->tecnica;
        }

        if($record->ano != ""){
            $trabalho['ano'] = $record->ano;
        }

        if($record->resumo != ""){
            $trabalho['resumo'] = $record->resumo;
        }

        if($record->artista != ""){
            $trabalho['artista'] = $record->artista;
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
                    ->select('exposicoes.id as id_exposicao',
                            'exposicoes.edital',
                            'exposicoes.titulo as tituloexposicao',
                            'exposicoes.data_inicio',
                            'exposicoes.data_fim',
                            'exposicoes.curador',
                            'trabalhos.id as id_trabalho',
                            'trabalhos.conteudo',
                            'trabalhos.titulo as titulotrabalho',
                            'trabalhos.tecnica',
                            'trabalhos.ano',
                            'trabalhos.resumo',
                            'usuarios.nome as artista')
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

        $dados = DB::table('exposicoes')
                        ->select('*')
                        ->where('id', '=', $id_exposicao)
                        ->get();

        if (!$dados){
            return [
                'success' => 0,
                'message' => 'Exposicao nao encontrada'
            ];
        }

        $exposicao = new Exposicao();

        $exposicao->fill($data);

        DB::beginTransaction();
        
        try{
        
            if($data['trabalhos']){
                
                DB::table('exposicoes')
                    ->where('id', '=', $id_exposicao)
                    ->update([
                    'titulo' => $exposicao->titulo,
                    'data_inicio' => $exposicao->data_inicio,
                    'data_fim' => $exposicao->data_fim
                    ]);

                DB::delete('delete from trabalhosexposicoes where exposicao = ?', [$id_exposicao]);

                foreach($data['trabalhos'] as $trabalho_id){
                    
                    $trabalho = Trabalho::find($trabalho_id);
                    $id = Util::newGUID();

                    DB::table('trabalhosexposicoes')
                    ->insert(['id' => $id,
                            'exposicao' => $id_exposicao,
                            'trabalho' => $trabalho_id,
                            'artista' => $trabalho->artista]);
                }

                DB::commit();

                return [
                    'success' => 1,
                    'message' => 'Exposicao e trabalhos alterados com sucesso'
                ];

            }else{

                DB::table('exposicoes')
                    ->where('id', $id_exposicao)
                    ->update([
                    'titulo' => $exposicao->titulo,
                    'data_inicio' => $exposicao->data_inicio,
                    'data_fim' => $exposicao->data_fim
                    ]);

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
                'message' => $e->getMessage()
            ];

        }
    }

    
}
