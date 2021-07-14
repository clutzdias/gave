<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaMensagens extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mensagens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->text('conteudo');
            $table->uuid('usuario_criador');
            $table->uuid('topico');
            $table->date('data');
            $table->foreign('usuario_criador')->references('id')->on('usuarios');
            $table->foreign('topico')->references('id')->on('topicos');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mensagens');
    }
}
