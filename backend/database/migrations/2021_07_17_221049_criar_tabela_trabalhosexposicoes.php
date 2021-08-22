<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaTrabalhosexposicoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('trabalhosexposicoes');
        
        Schema::create('trabalhosexposicoes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('exposicao');
            $table->uuid('trabalho');
            $table->uuid('artista');
            $table->foreign('exposicao')->references('id')->on('exposicoes');
            $table->foreign('trabalho')->references('id')->on('trabalhos');
            $table->foreign('artista')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabalhosexposicoes');
    }
}
