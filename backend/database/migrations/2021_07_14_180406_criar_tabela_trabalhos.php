<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaTrabalhos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('trabalhos');

        Schema::create('trabalhos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->text('conteudo');
            $table->uuid('artista');
            $table->string('titulo');
            $table->string('tecnica');
            $table->integer('ano');
            $table->text('resumo');
            $table->uuid('edital');
            $table->foreign('artista')->references('id')->on('usuarios');
            $table->foreign('edital')->references('id')->on('editais');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabalhos');
    }
}
