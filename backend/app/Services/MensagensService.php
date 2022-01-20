<?php

namespace App\Services;

use App\Models\Mensagem;
use App\Classes\Util;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MensagensService {

    protected function mensagemValidator($data)
    {
        $validator = Validator::make($data, [
            'conteudo' => 'required'               
        ],[
            'conteudo.required' => 'Conteudo nao especificado'
        ]);

        return $validator;
    }

    // criar somente a mensagem
    public function criarMensagem($data, $id_usuario, $id_topico)
    {
        $validator = $this->mensagemValidator($data);

        $data_atual = new DateTime('now');

        $data_mensagem = $data_atual->format('Y-m-d');

        if($validator->fails()){
            return [
                'success' => 0,
                'message' => $validator->errors()->first()
            ];
        } else {
          
            $id_mensagem = Util::newGuid();
            $mensagem= new Mensagem();
            $mensagem->fill($data);    

            DB::table('mensagens')
                ->insert(['id' => $id_mensagem,
                        'conteudo' => $mensagem->conteudo,
                        'topico' => $id_topico,
                        'usuario_criador' => $id_usuario,
                        'data' => $data_mensagem]);
            
            return [
                'success' => 1,
                'message' => 'Mensagem criada com sucesso'
            ];
            
        }
    }

    public function getMensagensPorTopico($id_topico, $id_usuario = '')
        {
        $query = DB::table('mensagens')
                        ->join('usuarios', 'mensagens.usuario_criador', '=', 'usuarios.id')
                        ->select('mensagens.id',
                                'mensagens.conteudo',
                                'mensagens.data',                               
                                'usuarios.nome as usuario')
                        ->where('mensagens.topico', '=', $id_topico);
        
        if($id_usuario != ''){
            $query->where('mensagens.usuario_criador', '=', $id_usuario);
        }     
        
        return $query->get();

    }

} 
