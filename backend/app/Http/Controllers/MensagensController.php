<?php

namespace App\Http\Controllers;

use App\Models\Mensagem;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\MensagensService;

class MensagensController extends Controller
{

    /**
     * @return \Services\MensagensServices
     */
    public function getService(){
        return new MensagensService();
    }

  
    public function criarMensagem(Request $request,$id_usuario,$id_topico){

        $data = request()->all();

        var_dump($data);

        try{
            $resposta = $this->getService()->criarMensagem($data, $id_usuario, $id_topico);

            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 418);   
            } else {
                $mensagem = $resposta['message'];
                return new JsonResponse($mensagem, 201);
            }         

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function listarMensagensPorTopico($id_topico){

        try{

            $trabalhos = $this->getService()->getMensagensPorTopico($id_topico);

            return new JsonResponse($trabalhos, 200);
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

}
