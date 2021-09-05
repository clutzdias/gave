<?php

namespace App\Http\Controllers;

use App\Services\ExposicoesService;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;

class ExposicoesController extends Controller
{
    protected function getService(){
        return new ExposicoesService();
    }

    public function listarExposicoes() {

        try{

            $exposicoes = $this->getService()->getExposicoes();

            return new JsonResponse($exposicoes, 200);
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function criarExposicao(Request $request, $id_edital) {

        $data = $request->all();

        try{

            $resposta = $this->getService()->criarExposicao($data, $id_edital);

            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 400);   
            } else if ($resposta['success'] == 2){
                return new JsonResponse($resposta['message'], 500);  
            } else {
                return new JsonResponse($resposta['message'], 201);
            }    

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function showExposicao($id_exposicao){

        try{

            $exposicoes = $this->getService()->getExposicaoComTrabalhos($id_exposicao);

            return new JsonResponse($exposicoes, 200);
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function alterarExposicao($id_exposicao){

        $data = request()->all();

        try{

            $resposta = $this->getService()->alterarExposicao($data, $id_exposicao);

            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 400);   
            } else if ($resposta['success'] == 2){
                return new JsonResponse($resposta['message'], 500);  
            } else {
                return new JsonResponse($resposta['message'], 201);
            }  
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }
}
