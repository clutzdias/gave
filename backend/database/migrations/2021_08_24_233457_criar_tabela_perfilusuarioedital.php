<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaPerfilusuarioedital extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('perfilusuarioedital');
        
        Schema::create('perfilusuarioedital', function (Blueprint $table) {
            $table->integer('perfilusuario');
            $table->uuid('edital');
            $table->uuid('usuario');
            $table->foreign('edital')->references('id')->on('editais');
            $table->foreign('usuario')->references('id')->on('usuarios');
            $table->unique(['perfilusuario', 'edital', 'usuario']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
