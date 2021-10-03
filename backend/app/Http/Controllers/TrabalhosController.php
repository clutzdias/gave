<?php

namespace App\Http\Controllers;

use App\Models\Trabalho;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\TrabalhosService;
use Illuminate\Support\Facades\Storage;

class TrabalhosController extends Controller
{

    /**
     * @return \Services\TrabalhosServices
     */
    protected function getService(){
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

    public function getTrabalho($id_trabalho){
        try{

            $dados = $this->getService()->findTrabalho($id_trabalho);

            if ($dados['success'] == 0){
                return new JsonResponse($dados['message'], 404);   
            } else {
                return new JsonResponse($dados, 200);
            } 
            

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }
    }

    public function criarTrabalho(Request $request){

        //var_dump($request->all());

        try{

            $data = request()->all();

            $resposta = $this->getService()->criarTrabalho($data);

            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 400);   
            } else {
                return new JsonResponse($resposta['message'], 201);
            } 

            /* if ($request->hasFile('image') && $request->file('image')->isValid()){
                $file = $request->file('image');

                //nome unico baseado em timestamp
                $name = uniqid(date('HisYmd'));

                $extension = $file->extension();

                $nameFile = "{$name}.{$extension}";

                //$file->storeAs('imagens/', $nameFile);

                //$fullPath = 'public/storage/imagens/'.$nameFile;

                //$url = asset($fullPath);

                $upload = $file->storeAs('imagens', $nameFile);

                //var_dump(storage_path());

                //$path = storage_path('public' . $nameFile);
                //$url = Storage::url($nameFile);

                $url = asset($upload);
        
                $resposta = $this->getService()->criarTrabalho($data, $url);

                if ($resposta['success'] == 0){
                    return new JsonResponse($resposta['message'], 400);   
                } else {
                    return new JsonResponse($resposta['message'], 201);
                }   
            } else {
                return new JsonResponse('O arquivo nao foi informado ou eh invalido', 400);
            }      */ 

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function atualizarTrabalho($id_trabalho){

        $data = request()->except('image');

        $path = '';
        
        if (request()->hasFile('image') && request()->file('image')->isValid()){

            //nome unico baseado em timestamp
            $name = uniqid(date('HisYmd'));

            $extension = request()->image->extension();

            $nameFile = "{$name} . {$extension}";

            $upload = request()->image->storeAs('trabalhos', $nameFile);

            $path = asset($upload);

        } else if (request()->hasFile('image') && !(request()->file('image')->isValid())){
            return new JsonResponse('O arquivo informado nao eh valido', 400);
        }

        try{

            $resposta = $this->getService()->atualizarTrabalho($data, $id_trabalho, $path);

            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 400);   
            } else {
                return new JsonResponse($resposta['message'], 204);
            }             

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }

    public function excluirTrabalho($id_usuario, $id_trabalho)
    {
        try{

            $resposta = $this->getService()->excluirTrabalho($id_usuario, $id_trabalho);
            
            if ($resposta['success'] == 0){
                return new JsonResponse($resposta['message'], 400);   
            } else {
                return new JsonResponse($resposta['message'], 200);
            } 

        }catch(Exception $e){
            return new JsonResponse($e->getMessage(), 500);

        }

    }
    
}
