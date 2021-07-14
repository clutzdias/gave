<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaExposicoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exposicoes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('edital');
            $table->text('titulo');
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->json('artistas');
            $table->json('trabalhos');
            $table->boolean('exposicao_aberta');
            $table->uuid('curador');
            $table->foreign('edital')->references('id')->on('editais');
            $table->foreign('curador')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exposicoes');
    }
}
