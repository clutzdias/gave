<?php

namespace App\Services;

use App\Models\Topico;
use App\Models\Mensagem;
use App\Classes\Util;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TopicosService {

    protected function topicoValidator($data)
    {
        $validator = Validator::make($data, [
            'titulo' => 'required',
            'conteudo' => 'required'
        ],[
            'titulo.required' => 'Titulo do topico nao informado',
            'conteudo.required' => 'Conteudo nao informado'
        ]);

        return $validator;
    }

   // Criar tópico com mensagem
    public function criarTopicoComMensagem($data, $id_usuario)
    {

        $data_atual = new DateTime('now');

        $data_topico = $data_atual->format('Y-m-d');

        $validator = $this->topicoValidator($data);

        if($validator->fails()){
            return [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
            $topico_id = Util::newGUID();

            try{
                DB::beginTransaction();
                $topico = new Topico();
                $topico->id = $topico_id;
                $topico->data_criacao = $data_topico;
                $topico->fill($data);
                $topico->usuario_criador=$id_usuario;
                $topico->save();

                $id_mensagem = Util::newGuid();
               
                DB::table('mensagens')
                ->insert(['id' => $id_mensagem,
                        'conteudo' => $data['conteudo'],
                        'topico' => $topico_id,
                        'usuario_criador' => $id_usuario,
                        'data' => $data_topico]);
                
                DB::commit();   

                return [
                    'success' => 1,
                    'message' => 'Topico com mensagem criado com sucesso'
                ];

            }catch(Exception $e){
                DB::rollBack(); 
                return [
                    'success' => 2,
                    'message' => 'Ocorreu um erro ao criar o topico com a mensagem'
                ];
            }
        }
    }

    public function getTopicosPorUsuario($id_usuario = '')
    {
        $query = DB::table('topicos')
                    ->join('usuarios', 'topicos.usuario_criador', '=', 'usuarios.id')
                    ->select('topicos.id',
                            'topicos.titulo',
                            'topicos.data_criacao',                                 
                            'usuarios.nome');
            
        if($id_usuario != ''){
            $query->where('topicos.usuario_criador', '=', $id_usuario);
        }     
        
        return $query->get();

    }
}
