<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaEditais extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('editais', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('titulo');
            $table->text('descricao');
            $table->text('exigencias');
            $table->json('selecionadores');
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->boolean('vigente');
            $table->integer('quantidade_obras');
        });
    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('editais');
    }
}
