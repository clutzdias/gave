<?php

namespace App\Http\Controllers;

use App\Models\Topico;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\TopicosService;

class TopicosController extends Controller
{

    /**
     * @return \Services\TopicosServices
     */
    public function getService(){
        return new TopicosService();
    }

    
    public function listarTopicos(){

        try{

            $topicos = $this->getService()->getTopicosPorUsuario();

            return new JsonResponse($topicos, 200);
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function topicosPorUsuario($id_topico, $id_usuario){

        try{

            $topicos = $this->getService()->getTopicosPorUsuario($id_topico, $id_usuario);

            return new JsonResponse($topicos, 200);
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }


    }

    // cria o tópico e a mensagem criarTopicoComMensagem
    public function criarTopicoComMensagem(Request $request,$id_usuario){

        $data = request()->all();

        try{
            $resposta = $this->getService()->criarTopicoComMensagem($data,$id_usuario);

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
