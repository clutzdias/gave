<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaTopicos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topicos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('titulo');
            $table->date('data_criacao');
            $table->uuid('usuario_criador');
            $table->foreign('usuario_criador')->references('id')->on('usuarios');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topicos');
    }
}
