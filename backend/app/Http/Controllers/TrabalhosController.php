<?php

namespace App\Http\Controllers;

use App\Models\Trabalho;
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


    public function listarTrabalhos($id_edital){

        try{

            $trabalhos = $this->getService()->getTrabalhosPorEdital($id_edital);

            return new JsonResponse($trabalhos, 200);
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function trabalhosPorUsuario($id_edital, $id_usuario){

        try{

            $trabalhos = $this->getService()->getTrabalhosPorEdital($id_edital, $id_usuario);

            return new JsonResponse($trabalhos, 200);
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }


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

    public function atualizarTrabalho($id_trabalho){

        $data = request()->all();

        try{

            $resposta = $this->getService()->atualizarTrabalho($data, $id_trabalho);

            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 400);   
            } else {
                return new JsonResponse($resposta['message'], 204);
            }             

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }
    
}
