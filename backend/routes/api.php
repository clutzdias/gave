<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(array('prefix' => 'v1'), function()
{

  Route::get('/', function () {
      return response()->json(['message' => 'Gave API', 'status' => 'Connected']);;
  });

  Route::get('{id_edital}/exposicoes', 'App\Http\Controllers\ExposicoesController@listarExposicoes')->name('exposicoes.listarExposicoes');
  Route::post('{id_edital}/exposicoes/criar', 'App\Http\Controllers\ExposicoesController@criarExposicao')->name('exposicoes.criarExposicao');
  Route::get('{id_edital}/exposicoes/{id_exposicao}', 'App\Http\Controllers\ExposicoesController@showExposicao')->name('exposicoes.showExposicao');
  Route::get('{id_edital}/trabalhos', 'App\Http\Controllers\TrabalhosController@listarTrabalhos')->name('trabalhos.listarTrabalhos');
  Route::get('{id_edital}/trabalhos/{id_usuario}', 'App\Http\Controllers\TrabalhosController@trabalhosPorUsuario')->name('trabalhos.trabalhosPorUsuario');
  Route::post('/trabalhos/criar', 'App\Http\Controllers\TrabalhosController@criarTrabalho')->name('trabalhos.criarTrabalho');
  Route::patch('/trabalhos/{id_trabalho}', 'App\Http\Controllers\TrabalhosController@atualizarTrabalho')->name('trabalhos.atualizarTrabalho');
  Route::delete('/trabalhos/{id_usuario}/excluir/{id_trabalho}', 'App\Http\Controllers\TrabalhosController@excluirTrabalho')->name('trabalhos.excluirTrabalho');
  

});

Route::get('/', function () {
    return redirect('api');
});

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */
