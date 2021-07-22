<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaSelecionadoreseditais extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('selecionadoreseditais');

        Schema::create('selecionadoreseditais', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('edital');
            $table->uuid('selecionador');
            $table->boolean('curador');
            $table->foreign('edital')->references('id')->on('editais');
            $table->foreign('selecionador')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('selecionadoreseditais');
    }
}
