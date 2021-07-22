<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaUsuarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('usuarios');
        
        Schema::create('usuarios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf')->unique();
            $table->string('nome');
            $table->string('email');
            $table->string('senha');
            $table->integer('perfil');
            $table->integer('idade');
            $table->string('genero');
            $table->string('cidade');
            $table->string('estado');
            $table->uuid('formacao');
            $table->foreign('formacao')->references('id')->on('formacoes');
        });
        //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
