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

    }

    public function criarExposicao(Request $request, $id_edital) {

        $data = $request->all();

        try{

            $resposta = $this->getService()->criarExposicao($data, $id_edital);

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function showExposicao(){

    }
}
