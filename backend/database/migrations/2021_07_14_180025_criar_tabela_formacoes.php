<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaFormacoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('formacoes');

        Schema::create('formacoes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('usuario');
            $table->string('instituicao');
            $table->string('curso');
            $table->string('situacao');
            $table->integer('semestres_cursados');
            $table->foreign('usuario')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formacoes');
    }
}
