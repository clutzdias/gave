<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\TrabalhosService;

class TrabalhosController extends Controller
{

    /**
     * @return \Services\TrabalhosServices
     */
    public function getService(){
        return new TrabalhosService();
    }


    public function listarTrabalhos(){

    }

    public function trabalhosPorUsuario($id_edital, $id_usuario){


    }

    public function criarTrabalho(Request $request){

        $data = request()->all();

        try{
            $resposta = $this->getService()->criarTrabalho($data);

            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 418);   
            } else {
                return new JsonResponse($resposta['message'], 201);
            }         

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }
    
}
