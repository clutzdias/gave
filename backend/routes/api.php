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

Route::group(array('prefix' => 'api'), function()
{

  Route::get('/', function () {
      return response()->json(['message' => 'Gave API', 'status' => 'Connected']);;
  });

  Route::get('{id_edital}/exposicoes', 'ExposicoesController@listarExposicoes')->name('exposicoes.listarExposicoes');
  Route::post('{id_edital}/exposicoes/criar', 'ExposicoesController@criarExposicao')->name('exposicoes.criarExposicao');
  Route::get('{id_edital}/exposicoes/{id_exposicao}', 'ExposicoesController@showExposicao')->name('exposicoes.showExposicao');
  Route::get('{id_edital}/trabalhos', 'TrabalhosController@listarTrabalhos')->name('trabalhos.listarTrabalhos');
  Route::get('{id_edital}/trabalhos/{id_usuario}', 'TrabalhosController@trabalhosPorUsuario')->name('trabalhos.trabalhosPorUsuario');
  Route::post('{id_edital}/trabalhos', 'TrabalhosController@criarTrabalho')->name('trabalhos.criarTrabalho');
  

});

Route::get('/', function () {
    return redirect('api');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
